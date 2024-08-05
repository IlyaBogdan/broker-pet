/**
 * Contains all methods which client can call
 */
type BrokerApiMethod = {
    format: any,
    action: Function
}

export type BrokerApi = {
    [key: string]: BrokerApiMethod;
}