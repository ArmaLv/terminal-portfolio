const Terminal = {
    inputField: null,
    outputDiv: null,
    terminal: null,
    promptSpan: null,
    autocompleteIndex: -1,
    autocompleteResults: [],
    autoScrollEnabled: true,

    init(inputField, outputDiv, terminal, promptSpan) {
        this.inputField = inputField;
        this.outputDiv = outputDiv;
        this.terminal = terminal;
        this.promptSpan = promptSpan;

        const savedTheme = localStorage.getItem('terminalTheme');
        if (savedTheme) {
            Commands.setTheme(savedTheme);
        }

        this.autoScrollEnabled = localStorage.getItem('autoScrollEnabled') !== 'false';

        this.setupEventListeners();
        this.updatePrompt();
        this.setupScrollObserver();
    },

    setupEventListeners() {
        this.inputField.addEventListener("keydown", (event) => this.handleKeyDown(event));

        document.addEventListener("keydown", (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                this.toggleAutoScroll();
                this.addSystemMessage(`Auto-scroll ${this.autoScrollEnabled ? 'enabled' : 'disabled'}`);
            }
        });
    },

    setupScrollObserver() {
        this.outputDiv.addEventListener('scroll', () => {
            const isScrolledToBottom = this.isScrolledToBottom();
            if (!isScrolledToBottom && this.autoScrollEnabled) {
                this.autoScrollEnabled = false;
                localStorage.setItem('autoScrollEnabled', 'false');
                this.addSystemMessage('Auto-scroll disabled (scrolled up)');
            }
        });
    },

    isScrolledToBottom() {
        const scrollTop = this.outputDiv.scrollTop;
        const scrollHeight = this.outputDiv.scrollHeight;
        const clientHeight = this.outputDiv.clientHeight;
        return scrollHeight - scrollTop - clientHeight < 10;
    },

    toggleAutoScroll() {
        this.autoScrollEnabled = !this.autoScrollEnabled;
        localStorage.setItem('autoScrollEnabled', this.autoScrollEnabled.toString());
        if (this.autoScrollEnabled) {
            this.scrollToBottom();
        }
    },

    scrollToBottom() {
        this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
        if (this.terminal) {
            this.terminal.scrollTop = this.terminal.scrollHeight;
        }
        window.scrollTo(0, document.body.scrollHeight);
    },

    addSystemMessage(message) {
        const systemMessageElement = document.createElement('div');
        systemMessageElement.className = 'output-line system-message';
        systemMessageElement.innerHTML = `<pre>[System] ${message}</pre>`;
        this.outputDiv.appendChild(systemMessageElement);
        this.scrollToBottom();
        setTimeout(() => {
            if (systemMessageElement.parentNode === this.outputDiv) {
                this.outputDiv.removeChild(systemMessageElement);
            }
        }, 3000);
    },

    handleKeyDown(event) {
        if (event.key === "Enter") {
            const inputValue = this.inputField.value.trim();
            if (inputValue) {
                Commands.commandHistory.push(inputValue);
                Commands.historyIndex = Commands.commandHistory.length;
            }
            this.processCommand(inputValue);
            this.inputField.value = "";
            this.autocompleteIndex = -1;
            this.autocompleteResults = [];
        } else if (event.key === "Tab") {
            event.preventDefault();
            this.handleAutocomplete();
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (Commands.historyIndex > 0) {
                Commands.historyIndex--;
                this.inputField.value = Commands.commandHistory[Commands.historyIndex];
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (Commands.historyIndex < Commands.commandHistory.length - 1) {
                Commands.historyIndex++;
                this.inputField.value = Commands.commandHistory[Commands.historyIndex];
            } else {
                Commands.historyIndex = Commands.commandHistory.length;
                this.inputField.value = "";
            }
        }
    },

    updatePrompt() {
        this.promptSpan.textContent = `visitor@portfolio:${FileSystem.getCurrentPath()}$`;
    },

    processCommand(command) {
        if (command === "clear") {
            this.outputDiv.innerHTML = "";
            return;
        }

        const [cmd, ...args] = command.split(" ");
        const argsString = args.join(" ");

        let output = `<div class="output-line"><span class='prompt'>visitor@portfolio:${FileSystem.getCurrentPath()}$</span><span class="command">${command}</span></div>`;

        const commands = Commands.getCommands();

        if (commands[cmd]) {
            let result = typeof commands[cmd] === "function" ? commands[cmd](argsString) : commands[cmd];

            if (cmd === "cd") {
                this.updatePrompt();
            }

            if (result) output += `<div class="output-line"><pre>${result}</pre></div>`;
        } else {
            output += `<div class="output-line"><pre>Command not found. Type 'help' for a list of commands.</pre></div>`;
        }

        if (output) {
            this.outputDiv.innerHTML += output;
            this.scrollToBottom();
            setTimeout(() => this.scrollToBottom(), 10);
            setTimeout(() => this.scrollToBottom(), 100);
        }
    },

    handleAutocomplete() {
        const inputValue = this.inputField.value.trim();
        if (!inputValue) return;

        const parts = inputValue.split(" ");
        const command = parts[0];
        const partial = parts.slice(1).join(" ");

        if (parts.length === 1) {

            this.autocompleteResults = Object.keys(Commands.getCommands()).filter(cmd =>
                cmd.startsWith(command)
            );
        } else {

            let current = FileSystem.getCurrentDirectoryContents();

            if (typeof current === "object") {
                this.autocompleteResults = Object.keys(current).filter(item =>
                    item.startsWith(partial)
                );
            }
        }

        if (this.autocompleteResults.length > 0) {
            this.autocompleteIndex = (this.autocompleteIndex + 1) % this.autocompleteResults.length;
            if (parts.length === 1) {
                this.inputField.value = this.autocompleteResults[this.autocompleteIndex];
            } else {
                this.inputField.value = command + " " + this.autocompleteResults[this.autocompleteIndex];
            }
        }
    }
};