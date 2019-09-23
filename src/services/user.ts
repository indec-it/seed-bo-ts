/* global localStorage, window */
import Http from './http';

import { User, UserInterface } from '~models/index';

const TOKEN_KEY = 'id_token';
const SESSION = 'session';

declare const ENDPOINT: string;
declare const AUTH_LOGIN: string;

export default class UserService {
    static async fetch(): Promise<UserInterface[]> {
        const { users } = await Http.get('api/users');
        return users.map((user): {

        } => new User(user));
    }

    static async find(id): Promise<User> {
        const { user } = await Http.get(`api/users/${id}`);
        return new User(user);
    }

    static validateToken(token): Promise<{success: boolean; user: UserInterface}> {
        return Http.get(`${ENDPOINT}public-api/session/${token}`);
    }

    static setToken(token): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    static setSession(user): void {
        localStorage.setItem(SESSION, JSON.stringify(user));
    }

    static getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    static getSession(): UserInterface {
        return JSON.parse(localStorage.getItem(SESSION));
    }

    static hasSession(): boolean {
        return !!localStorage.getItem(TOKEN_KEY);
    }

    static async validateSession(queryParams): Promise<void> {
        if (queryParams && queryParams['?accessToken']) {
            try {
                const { success, user } = await UserService.validateToken(queryParams['?accessToken']);
                if (success) {
                    UserService.setToken(queryParams['?accessToken']);
                    UserService.setSession(user);
                    window.location.href = '/';
                    return;
                }
                window.location.href = AUTH_LOGIN;
                return;
            } catch (err) {
                window.location.href = AUTH_LOGIN;
                return;
            }
        } else if (UserService.hasSession()) {
            const { success, user } = await UserService.validateToken(UserService.getToken());
            if (success) {
                UserService.setSession(user);
            } else {
                window.location.href = AUTH_LOGIN;
            }
            return;
        }
        window.location.href = AUTH_LOGIN;
    }

    /**
     * Clear the session token.
     */
    static signOut(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(SESSION);
        window.location.href = AUTH_LOGIN;
    }

    /**
     * Get a Bearer Auth Header for make HTTP requests.
     * @returns {string} An authorization header.
     */

    static getAuthHeader(): string {
        return `Bearer ${this.getToken()}`;
    }
}
