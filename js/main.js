document.addEventListener("DOMContentLoaded", function () {

    const inputField = document.getElementById("input");
    const outputDiv = document.getElementById("output");
    const terminal = document.getElementById("terminal");
    const promptSpan = document.getElementById("prompt");

    const isInitialized = localStorage.getItem('terminalInitialized');

    if (!isInitialized) {
        LoadingScreen.simulate(inputField, outputDiv, promptSpan);
    } else {
        inputField.focus();
    }

    Terminal.init(inputField, outputDiv, terminal, promptSpan);

    terminal.addEventListener("click", function() {
        inputField.focus();
    });
});