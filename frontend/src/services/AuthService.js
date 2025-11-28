const STORAGE_KEY = 'inmo_user_v1';

export default class AuthService {
    constructor() {
        const raw = localStorage.getItem(STORAGE_KEY);
        this.user = raw ? JSON.parse(raw) : null;
    }

    register({ id, username, email, location, token }) {
        const u = { 
            id: id ?? Date.now().toString(), 
            username, 
            email, 
            location,
            token
        };
        this.user = u;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        return u;
    }

    login({ id, username, email, location, token }) {
        const u = { id, username, email, location, token };
        this.user = u;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        return u;
    }

    logout() {
        this.user = null;
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("token");
    }

    currentUser() {
        return this.user;
    }
}
