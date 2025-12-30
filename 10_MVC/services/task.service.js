const fs = require("fs");
const Task = require("../models/task.model");

class TaskService {
    constructor() {
        this.file = "./data/tasks.json";
    }

    getAll() {
        return JSON.parse(fs.readFileSync(this.file));
    }

    add(title) {
        const tasks = this.getAll();
        const task = new Task(title);
        tasks.push(task);
        fs.writeFileSync(this.file, JSON.stringify(tasks, null, 2));
    }
}

module.exports = new TaskService();