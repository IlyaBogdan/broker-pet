import { SessionStore } from "../../SessionStore";
import { BrokerMethods } from "./types";

/**
 * Abstract broker class
 */
export abstract class Broker {
    
    /**
     * Users sessions
     */
    protected sessionStore: SessionStore;

    constructor() {
        this.sessionStore = new SessionStore();  
    }

    /**
     * Get API methods for current broker
     */
    protected abstract get methods(): BrokerMethods;

    /**
     * Check if method exists in API of this broker
     * 
     * @param {string} method 
     * @returns {boolean}
     */
    public methodExists(method: keyof typeof this.methods): boolean {
        return this.methods.hasOwnProperty(method);
    }

    /**
     * Execute broker method
     * 
     * @param {string} brokerMethod 
     * @returns {any}
     * @throws Method 'apiMethod' not exists
     */
    public call(brokerMethod: keyof typeof this.methods): any {
        if (!this.methodExists(brokerMethod)) throw new Error(`Method '${brokerMethod}' not exists`);

        return (message) => {
            return this.methods[brokerMethod](message, this);
        }
    }

}