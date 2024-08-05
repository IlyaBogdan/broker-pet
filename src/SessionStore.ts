import { randomUUID } from "crypto";
import WebSocket from 'ws';
import { UserDto } from "./brokers/dto/user.dto";

/**
 * Interface describes user connection to broker
 */
interface IConnection {

    /**
     * Websocket identifier
     */
    ws: WebSocket,

    /**
     * User connection token
     */
    token: string,

    /**
     * Subscribed broker events
     */
    listenEvents: Array<any>,

    /**
     * Additional other params
     */
    optional: {
        [key: string]: any | boolean;
    }
};

export class WsSession {

    private user: UserDto | undefined;
    private online: boolean;
    private sessionId: string;
    private connections: Array<IConnection> = [];

    constructor(options: {
        token: string,
        sessionId: string,
        ws: WebSocket
    }) {
        this.sessionId = options.sessionId;
        this.online = true;
        this.addConnection(options.ws, options.token);
    }

    /**
     * TODO!!!
     * Accept event which will be listen for user's session.
     * 
     * @param {Event} event
     * @returns {WsSession}
     */
    public addListener(): WsSession {

        return this;
    }

    /**
     * TODO!!!
     * Accept flash event for user's session.
     * After completing listener will be removed.
     * 
     * @param {Event} event
     * @returns {WsSession}
     */
    public flashEvent(): WsSession {

        return this;
    }

    /**
     * Add new connection to the session
     * 
     * @param {WebSocket} ws Websoket identificator
     * @param {string} token User connection token
     * @returns {WsSession}
     */
    public addConnection(ws: WebSocket, token: string): WsSession {
        this.connections.push({ ws, token, listenEvents: [], optional: {} });
        ws.on('close', () => {
            console.log('Close connection');
            if (this.getConnections().length == 0) {
                this.setOnline(false);
            }
        });
        return this;
    }

    /**
     * Remove connection by token
     * 
     * @param {string} token User connection token
     * @returns {WsSession}
     */
    public removeConnection(token: string): WsSession {
        this.connections = this.connections.filter((connection) => connection.token != token);
        return this;
    }

    /**
     * Get all user connections
     * 
     * @returns {Array<IConnection>}
     */
    public getConnections(): Array<IConnection> {
        return this.connections;
    }

    /**
     * Return connection by connection token
     * 
     * @param {string} token Connection token
     * @returns {IConnection}
     */
    public getConnectionByToken(token: string): IConnection {
        return this.connections.filter((connection) => connection.token == token)[0];
    }

    /**
     * Set user online
     * 
     * @param {boolean} online Online status
     * @returns {WsSession}
     */
    public setOnline(online: boolean): WsSession {
        this.online = online;
        return this;
    }

    /**
     * Get online status
     * 
     * @returns {boolean}
     */
    public getOnline(): boolean {
        return this.online;
    }

    /**
     * Get session ID 
     * 
     * @returns {string}
     */
    public getSessionId(): string {
        return this.sessionId;
    }

    /**
     * Set user info into connection
     * 
     * @param {UserDto} user User info 
     * @returns {WsSession}
     */
    public setUser(user: UserDto): WsSession {
        this.user = user;
        return this;
    }

    /**
     * Get user info from connection
     * 
     * @returns {UserDto|undefined}
     */
    public getUser(): UserDto | undefined {
        return this.user;
    }

    /**
     * Proto TODO
     * @param users 
     * @returns 
     */
    public getOnlineUsersFromLists(users: Array<UserDto>): Array<IConnection> {
        const connections = this.connections;

        return connections;
    }
};

/**
 * Store for users connections
 */
export class SessionStore {

    /**
     * Singletone instance
     */
    private static instance: SessionStore = undefined;

    /**
     * List of connections
     */
    private sessions: Array<WsSession> = [];

    constructor() {
        if (!SessionStore.instance) SessionStore.instance = this;

        return SessionStore.instance;                
    }

    /**
     * Create new connection session by token and websocket identificator
     * 
     * @param {string} token User's connection token
     * @param {WebSocket} ws Websocket identificator 
     * @returns {WsSession} New connection session
     */
    public createSession(token: string, ws: WebSocket): WsSession {
        while(true) {
            const sessionId: string = randomUUID();
            if (this.getSessionById(sessionId)) continue;

            const session = new WsSession({ sessionId, token, ws });
            this.sessions.push(session);
            return session;
        }
        
    }

    /**
     * Get session by session ID
     * 
     * @param {string} sessionId session ID
     * @returns {WsSession|undefined}
     */
    private getSessionById(sessionId: any): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getSessionId() == sessionId)[0];
        return session;
    }

    /**
     * Get session by session token
     * 
     * @param {string} token user's connection token
     * @returns {WsSession|undefined}
     */
    public getSessionByToken(token: string): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getConnections().filter((connection) => connection.token == token).length)[0];
        return session;
    }

    /**
     * Get session by user info
     * 
     * @param {UserDto} user user's info
     * @returns {WsSession|undefined}
     */
    public getSessionByUser(user: UserDto): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getUser()?.id == user.id)[0];
        return session;
    }

    /**
     * Get all sessions
     * 
     * @returns {Array<WsSession>}
     */
    public getSessions(): Array<WsSession> {
        return this.sessions;
    }
};
