import { SessionStore } from "../../SessionStore";
import { BrokerApi } from "./BrokerApi";

/**
 * Abstract broker class
 */
export abstract class Broker {
    
    /**
     * Broker api methods
     */
    public api: BrokerApi;

    /**
     * Users sessions
     */
    protected sessionStore: SessionStore;

    constructor() {
        this.api = this.getApi();
        this.sessionStore = new SessionStore();  
    }

    /**
     * Get API methods for current broker
     */
    protected abstract getApi(): BrokerApi;

    /**
     * Check if method exists in API of this broker
     * 
     * @param {string} method 
     * @returns {boolean}
     */
    public methodExists(method: keyof typeof this.api): boolean {
        return this.api.hasOwnProperty(method);
    }

    /**
     * Execute broker method
     * 
     * @param {string} apiMethod 
     * @returns {any}
     * @throws Method 'apiMethod' not exists
     */
    public call(apiMethod: keyof typeof this.api): any {
        if (!this.methodExists(apiMethod)) throw new Error(`Method '${apiMethod}' not exists`);

        return (message) => {
            return this.api[apiMethod].action(message, this);
        }
    }

}