# Terminal Portfolio

A stylish, interactive terminal-based portfolio website with a retro CRT aesthetic. This project simulates a command-line interface in the browser, allowing visitors to navigate content using familiar terminal commands.
This project was made for fun and learning purposes. So it is not optimized for production use nor it is production ready. There are some features that are not implemented yet or are not working properly.

![Terminal Portfolio Screenshot Nr.1](assets/screenshot.png)
![Terminal Portfolio Screenshot Nr.2](assets/screenshot1.png)

## Features

- **Authentic Terminal Experience**: Simulates a real terminal with command history, autocomplete, and familiar Unix-like commands
- **File System Navigation**: Browse through a virtual file system with directories and files
- **Multiple Themes**: Choose from 5 different themes (Cyberpunk, Sakura, Summer, Dracula, Winter)
- **CRT Effects**: Retro scanlines, flicker, and glitch animations for an authentic old-school terminal feel
- **Responsive Design**: Works on desktop and mobile devices
- **Smart Auto-Scroll**: Automatically scrolls to show new content with intelligent user control
- **Loading Screen**: Boot-up animation simulating a system startup

## Commands

Visitors can interact with the portfolio using these commands:

- `help` - Display available commands
- `ls` - List files and directories in the current location
- `cd [dir]` - Change directory
- `cat [file]` - View file contents
- `pwd` - Show current directory path
- `clear` - Clear the terminal screen
- `theme [name]` - Change the terminal theme
- `echo [text]` - Display text
- `whoami` - Display username
- `date` - Show current date and time
- `history` - Show command history
- `fastfetch` - Display system information
- `reboot` - Restart the terminal

## Themes

- **Cyberpunk** (Default): Green text on black background
- **Sakura**: Pink text on dark purple background
- **Summer**: Gold text on dark green background
- **Dracula**: Light text on dark gray-blue background
- **Winter**: Light blue text on dark blue background

## File System Structure

The portfolio is organized into a virtual file system:

```
~/
├── about.txt       # Information about me
├── contact.txt     # Contact information
└── projects/       # Directory containing projects
    ├── projects2/  # Nested project directory
    │   ├── life/   # Another nested directory
    │   └── help.js # Help information
    └── web.js      # Web project information
```

## Auto-Scroll Feature

The terminal includes a smart auto-scroll system:

- Automatically scrolls to show new content

## Technical Implementation

This project is built with vanilla JavaScript and CSS, with no external dependencies. Key components include:

- **File System**: Virtual file system with navigation capabilities
- **Command Processor**: Parses and executes terminal commands
- **Terminal UI**: Handles input/output and visual effects
- **Theme Manager**: Controls the visual appearance

## Browser Compatibility

Works in all modern browsers including:
- Chrome/Edge (Chromium-based)
- Firefox
- Safari

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. No build process or dependencies required!

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/orderlaw">
        <img src="https://avatars.githubusercontent.com/u/102177927?v=4" width="100px;" alt="orderlaw"/>
        <br />
        <sub><b>orderlaw</b></sub>
      </a>
    </td>
  </tr>
</table>

## License

```
Copyright (c) 2025 ArmaLv

You are free to use this project for personal or commercial purposes. Without any warranty or responsibility.
You can modify, distribute, and use this project as you see fit.

```
