import { BrokerMethods } from "./libs/Broker/types";
import { ChatBroker } from "./modules/chat/broker";

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
        if (broker.methodExists(message.method as keyof BrokerMethods)) {
            console.log(`Runnning: ${message.method}`);
            const closure = broker.call(message.method as keyof BrokerMethods);
            result = closure(message);
        }
    }

    return result;
}

export { execute };