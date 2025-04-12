const LoadingScreen = {
    spinnerFrames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    
    loadingSteps: [
        ["Starting Portfolio OS", 1500, true],
        ["Loading kernel modules", 800, true],
        ["Checking file system", 1000, true],
        ["Mounting directories", 600, true],
        ["Starting package manager", 800, true],
        ["Reading package lists", 600, true],
        ["Building dependency tree", 700, true],
        ["Updating core packages:", 500, false],
        ["Installing: portfolio-core (1.0.0)", 1000, false],
        ["Installing: terminal-utils (2.1.0)", 800, false],
        ["Installing: theme-manager (1.2.0)", 700, false],
        ["Installing: file-system (3.0.1)", 900, false],
        ["Configuring system environment", 1000, true],
        ["Starting terminal service", 800, true],
        ["System ready!", 500, false]
    ],
    
    async simulate(inputField, outputDiv, promptSpan) {
        let spinnerIndex = 0;
        
        inputField.style.display = 'none';
        promptSpan.style.display = 'none';

        for (const [message, delay, showSpinner] of this.loadingSteps) {
            let dots = '';
            let spinner = '';
            const startTime = Date.now();
            const line = document.createElement('div');
            line.className = 'output-line';
            outputDiv.appendChild(line);

            while (Date.now() - startTime < delay) {
                if (showSpinner) {
                    spinner = this.spinnerFrames[spinnerIndex];
                    spinnerIndex = (spinnerIndex + 1) % this.spinnerFrames.length;
                    dots = '.'.repeat(Math.floor((Date.now() - startTime) / (delay/3)) % 4);
                    line.innerHTML = `<pre>${spinner} ${message}${dots}</pre>`;
                } else {
                    line.innerHTML = `<pre>${message}</pre>`;
                }
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            line.innerHTML = `<pre>${showSpinner ? '✓' : ''} ${message}${showSpinner ? '...' : ''}</pre>`;
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }

        localStorage.setItem('terminalInitialized', 'true');

        // Clear loading screen
        setTimeout(() => {
            outputDiv.innerHTML = "";
            inputField.style.display = '';
            promptSpan.style.display = '';
            inputField.focus();
        }, 1000);
    }
}; 