import { BrokerMethods } from "./libs/Broker/types";
import { ChatBroker } from "./modules/chat/broker";

const brokers = [
    new ChatBroker
];

type Message = any & {
    method: string
}

/**
 * Runs broker action
 * 
 * @param {Message} message 
 * @returns 
 */
export const execute = (message: Message) => {
    let result;

    for (const broker of brokers) {
        if (broker.methodExists(message.method as keyof BrokerMethods)) {
            try {
                console.log(`Runnning: ${message.method}`);
                const closure = broker.call(message.method as keyof BrokerMethods);
                result = closure(message);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return result;
};
