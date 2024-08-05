import { BrokerApi } from "../abstracts/Broker/BrokerApi";
import { ChatBroker } from "./Chat/ChatBroker";

const brokers = [
    new ChatBroker
];

/**
 * Runs broker action
 * 
 * @param message 
 * @returns 
 */
const execute = (message: { method: string }) => {
    let result;

    for (const broker of brokers) {
        if (broker.methodExists(message.method as keyof BrokerApi)) {
            console.log(`Runnning: ${message.method}`);
            const closure = broker.call(message.method as keyof BrokerApi);
            result = closure(message);
        }
    }

    return result;
}

export { execute };