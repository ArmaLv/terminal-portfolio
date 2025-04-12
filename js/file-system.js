const FileSystem = {
    directories: {
        projects: {
            projects2: {
                life: {

                },
                "help.js": fileContents["help.js"]
            },
            "web.js": fileContents["web.js"]
        },
        "about.txt": fileContents["about.txt"],
        "contact.txt": fileContents["contact.txt"]
    },

    currentPath: ["~"],
    currentDirectory: "~",

    createDirectory(path, dirName) {
        if (!dirName || typeof dirName !== 'string') {
            return "Invalid directory name";
        }

        const targetPath = path || this.getCurrentPath();
        const targetDir = this.getDirectoryAtPath(targetPath);

        if (!targetDir) {
            return `Path '${targetPath}' not found`;
        }

        if (dirName in targetDir) {
            return `Directory '${dirName}' already exists`;
        }

        targetDir[dirName] = {};
        return null;
    },

    getDirectoryAtPath(path) {
        if (path === "~") {
            return this.directories;
        }

        const parts = path.split("/").filter(part => part !== "" && part !== ".");
        let current = this.directories;

        if (parts[0] === "~") {
            parts.shift();
        }

        for (const part of parts) {
            if (part === "..") {

                continue;
            }

            if (!(part in current) || typeof current[part] !== "object") {
                return null;
            }

            current = current[part];
        }

        return current;
    },

    getCurrentPath() {
        return this.currentPath.join("/").replace("~/", "~");
    },

    navigateToPath(path) {
        const parts = path.split("/");

        let current;
        let newPath;

        if (path.startsWith("~") || path.startsWith("/")) {
            current = this.directories;
            newPath = ["~"];
        } else {

            current = this.getCurrentDirectoryContents();
            newPath = [...this.currentPath]; 
        }

        for (const part of parts) {
            if (part === "..") {
                newPath.pop();
                if (newPath.length === 0) newPath.push("~");

                current = this.directories;
                for (let i = 1; i < newPath.length; i++) {
                    if (newPath[i] === "~") continue;
                    current = current[newPath[i]];
                }
                continue;
            }

            if (part === "." || part === "") continue;

            if (current[part]) {
                if (typeof current[part] === "object") {
                    newPath.push(part);
                    current = current[part];
                } else {
                    return `'${part}' is not a directory`;
                }
            } else {
                return `Directory '${part}' not found`;
            }
        }

        this.currentPath = newPath;
        this.currentDirectory = newPath[newPath.length - 1];
        return null;
    },

    getCurrentDirectoryContents() {
        let current = this.directories;
        let path = this.currentPath;

        for (let i = 1; i < path.length; i++) {
            if (path[i] === "~") continue;
            if (current[path[i]] && typeof current[path[i]] === 'object') {
                current = current[path[i]];
            } else {

                return null;
            }
        }

        return current;
    },

    getFileContents(filename) {
        let current = this.getCurrentDirectoryContents();
        return current && filename in current ? current[filename] : null;
    }
};