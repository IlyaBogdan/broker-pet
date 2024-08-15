import { Broker } from "./Broker";

export type BrokerApi = {
    [key: string]: (brokerMessage: any, broker?: Broker) => void;
}