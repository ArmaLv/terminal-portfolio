const Commands = {
    themes: ["cyberpunk", "sakura", "summer", "dracula", "winter"],
    currentTheme: "cyberpunk",
    commandHistory: [],
    historyIndex: -1,

    setTheme(theme) {
        if (this.themes.includes(theme)) {
            document.documentElement.setAttribute("data-theme", theme);
            this.currentTheme = theme;
            localStorage.setItem('terminalTheme', theme);
            return `Theme changed to ${theme}`;
        }
        return `Theme '${theme}' not found. Available themes: ${this.themes.join(", ")}`;
    },

    getCommands() {
        return {
            "help": "Available commands: help, ls, cd [dir], cat [file], pwd, clear, theme [name], echo [text], whoami, date, history, fastfetch, reboot",
            "ls": (args) => this.ls(args),
            "cd": (args) => this.cd(args),
            "pwd": () => FileSystem.getCurrentPath(),
            "whoami": () => "visitor",
            "date": () => new Date().toString(),
            "echo": (args) => args || "",
            "history": () => this.showHistory(),
            "cat": (args) => this.cat(args),
            "clear": () => { outputDiv.innerHTML = ""; return null; },
            "theme": (args) => this.handleTheme(args),
            "fastfetch": () => this.fastfetch(),
            "reboot": () => this.reboot()
        };
    },

    ls(args) {
        const current = FileSystem.getCurrentDirectoryContents();
        if (typeof current === "object") {
            const entries = Object.keys(current);
            const files = entries.filter(entry => entry.includes("."));
            const dirs = entries.filter(entry => !entry.includes("."));

            dirs.sort();
            files.sort();

            if (args === "-l") {

                const detailedList = [...dirs, ...files].map(entry => {
                    const isDir = !entry.includes(".");
                    return `${isDir ? "d" : "-"}rw-r--r-- 1 visitor visitor ${entry}`;
                });
                return detailedList.join("\n");
            }

            return [...dirs, ...files].join("  ");
        }
        return "Directory not found";
    },

    cd(args) {
        if (!args) {
            FileSystem.currentPath = ["~"];
            FileSystem.currentDirectory = "~";
            return null;
        }

        return FileSystem.navigateToPath(args);
    },

    cat(args) {
        if (!args) return "Please specify a file to read";

        const contents = FileSystem.getFileContents(args);
        if (contents) {
            return contents;
        }

        return `cat: ${args}: No such file`;
    },

    handleTheme(args) {
        if (!args) {
            return `Current theme: ${this.currentTheme}\nAvailable themes: ${this.themes.join(", ")}`;
        }
        return this.setTheme(args.toLowerCase());
    },

    showHistory() {
        return this.commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join("\n");
    },

    fastfetch() {
        const asciiArt = `
████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝`;

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const screenWidth = window.innerWidth;
        
        const timeFactor = (hours * 3600 + minutes * 60 + seconds) / 86400;
        
        const dateInDays = (year - 2000) * 365 + (month - 1) * 30 + day;
        const totalPossibleDays = 100 * 365;
        const dateFactor = dateInDays / totalPossibleDays;
        
        const screenFactor = screenWidth / 1920;
        
        const randomSeed = Math.sin(now.getTime() / 1000) * 10000;
        const pseudoRandom = (randomSeed - Math.floor(randomSeed)); 
        
        const wave = Math.sin(timeFactor * Math.PI * 2); 
        const curveBoost = Math.pow(dateFactor, 1.5) * 0.75 + 0.25; 
        
        const memoryGB = Math.floor(
            4 +
            (timeFactor * 2 + pseudoRandom * 1.39) * 
            curveBoost *
            screenFactor *
            (48 + 16 * wave) 
        );
        const systemInfo = {
            "OS": "Portfolio OS",
            "Host": "visitor@portfolio",
            "Kernel": "1.0.0",
            "Uptime": "No Data",
            "Packages": "No Data",
            "Shell": "bash",
            "Terminal": "portfolio-terminal",
            "CPU": "Quantum Core",
            "Memory": `${memoryGB} GB`,
            "Theme": this.currentTheme
        };

        let info = "";
        for (const [key, value] of Object.entries(systemInfo)) {
            info += `${key.padEnd(10)}: ${value}\n`;
        }

        return `${asciiArt}\n\n${info}`;
    },

    reboot() {
        setTimeout(() => {
            window.location.reload();
        }, 500);
        return "Rebooting system...";
    }
};