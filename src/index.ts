import WebSocket, { WebSocketServer, RawData } from 'ws';
import { execute } from './brokers/BrokerProvider';
import { BrokerMessage } from './abstracts/Broker/BrokerMessage';
import { SessionStore, WsSession } from './SessionStore';
import { request } from './utils/backendRequest';
import { ERequestMethods } from './utils/ERequestMethods';
import { PORT } from './consts';
var Storage = require('node-storage');

const store = new Storage('./store.json');

/**
 * Main entry-point for brokers
 */
const WebSocketEntry = (() => {
    /**
     * Started websocket server
     */
    let server: WebSocketServer;

    /**
     * Brocker access token for requests
     */
    let accessToken: String = null;

    /**
     * Connected user's sessions store
     */
    const sessionStore: SessionStore = new SessionStore();

    /**
     * Returns user session by broker message
     * 
     * @param {BrokerMessage} message incomming message in broker
     * @param {WebSocket} ws websocket connection
     * @returns {WsSession} connected user's session
     */
    const getSession = (message: BrokerMessage, ws: WebSocket): WsSession => {
        let session = sessionStore.getSessionByToken(message.token);
        if (!session) session = sessionStore.createSession(message.token, ws);

        return session;
    }

    return class WebSocketEntry {
        
        /**
         * Function for creating server. Server will be created if
         * broker successfully accepted access token for requests to backend
         * 
         * @returns {Promise<WebSocketServer>} started websocket server
         */
        public static async getServer(): Promise<WebSocketServer> {
            if (server) return server;
            else {
                await request('', {}, ERequestMethods.POST)
                    .then((response) => {
                        store.put('accessToken', response.access_token);
                        server = new WebSocketServer({ port: PORT });
                        console.log(`WebSocket is running on ${PORT} port`);
                        server.on('connection', function (ws) {
                            ws.on('message', WebSocketEntry.main(ws));
                        });
                    });

                return server;
            }
        }

        /**
         * Main method for intercepting websocket messages
         * 
         * @param {WebSocket} ws 
         * @returns {Function<void>}
         */
        public static main(ws: WebSocket) {
            return (message: RawData): void => {
                if (BrokerMessage.validateFormat(message)) {
                    const brokerMessage = BrokerMessage.getInstance();                           
                    console.log(`Accepted: `, brokerMessage);

                    getSession(brokerMessage, ws);
                        
                    execute(brokerMessage)
                        .then((result) => {
                            console.log('Response: ', result);
                            ws.send(JSON.stringify(result));
                        });
                    
                }
            }
        }

        /**
         * Return session store
         * 
         * @returns {SessionStore} Connected user's sessions store
         */
        public static getSessionStore(): SessionStore {
            return sessionStore;
        }

        public static accessToken(): String {
            return accessToken;
        }
    }
})();

WebSocketEntry.getServer();

export { WebSocketEntry }