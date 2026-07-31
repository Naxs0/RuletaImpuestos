class MemoryManager {

    constructor() {
        this.memories = new Map();
    }

    create(userId) {

        this.memories.set(userId, []);

    }

    add(userId, role, content) {

        if (!this.memories.has(userId)) {
            this.create(userId);
        }

        this.memories.get(userId).push({
            role,
            content
        });

    }

    get(userId) {

        return this.memories.get(userId) || [];

    }

    clear(userId) {

        this.memories.delete(userId);

    }

}

module.exports = new MemoryManager();