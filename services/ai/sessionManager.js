class SessionManager {

    constructor() {
        this.sessions = new Map();
    }

    hasSession(userId) {
        return this.sessions.has(userId);
    }

    getSession(userId) {
        return this.sessions.get(userId);
    }

    createSession(session) {
        this.sessions.set(session.userId, session);
    }

    removeSession(userId) {
        this.sessions.delete(userId);
    }

    updateActivity(userId) {

        const session = this.sessions.get(userId);

        if (!session) return;

        session.lastActivity = Date.now();
    }

    getAllSessions() {
        return [...this.sessions.values()];
    }

}

module.exports = new SessionManager();