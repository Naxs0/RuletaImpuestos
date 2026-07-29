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

    setTimeout(userId, timeout) {

        const session = this.sessions.get(userId);

        if (!session) return;

        session.timeout = timeout;

    }

    clearTimeout(userId) {

        const session = this.sessions.get(userId);

        if (!session || !session.timeout) return;

        clearTimeout(session.timeout);

        session.timeout = null;

    }

    resetTimeout(userId, callback) {

        const session = this.sessions.get(userId);

        if (!session) return;

        if (session.timeout) {
            clearTimeout(session.timeout);
        }

        session.lastActivity = Date.now();

        session.timeout = setTimeout(callback, 60 * 60 * 1000);

    }

}

module.exports = new SessionManager();