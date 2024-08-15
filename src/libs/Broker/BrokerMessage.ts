import { RawData } from "ws";

interface ObjectInterface {
    [key: string]: any | boolean;
    booleanKey: boolean;
}

export class BrokerMessage<T = any> {

    private static instance: BrokerMessage<ObjectInterface>;
    public method: string;
    public token: string;

    constructor(message: RawData) {
        const json = JSON.parse(message.toString());
        this.method = json.method;
        this.token = json.token;
        Object.assign(this, json);
    }

    public validate(format: ObjectInterface): Boolean {

        return true;
    }

    public static validateFormat(message: RawData): Boolean {

        BrokerMessage.instance = new BrokerMessage(message);
        return true;
    }

    public static getInstance(): BrokerMessage<ObjectInterface> {
        return BrokerMessage.instance;
    }

    public serialize(): String {
        return JSON.stringify(this);
    }
}