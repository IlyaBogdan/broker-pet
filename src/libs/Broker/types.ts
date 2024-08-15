import { Broker } from "./Broker";

export type BrokerMethods = {
    [key: string]: (brokerMessage: any, broker?: Broker) => void;
}