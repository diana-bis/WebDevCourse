class Task {
    constructor(title) {
        this.id = Date.now();
        this.title = title;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}

module.exports = Task;  // When someone requires this file, give them the Task class