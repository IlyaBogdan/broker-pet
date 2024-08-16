import fetch, { RequestInit } from 'node-fetch';
import { ERequestMethods } from '../../utils/ERequestMethods';
var Storage = require('node-storage');

const store = new Storage('./store.json');
const BROKER_TOKEN: string|null = store.get('access_token');

export const BACKEND_URL: string = `${process.env.BACKEND_URL}/api/broker`;

/**
 * Request to backend from broker
 * 
 * @param {string} endpoint endpoint for backend request
 * @param {any} data request body
 * @param { ERequestMethods } method request method
 * @returns {Promise<any>}
 */
export const request = async (endpoint: string, data: any, method: ERequestMethods): Promise<any> => {
    const requestInit: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (BROKER_TOKEN) {
        requestInit.headers['X-Broker-Token'] = BROKER_TOKEN;
    }
    
    if (![ERequestMethods.GET, ERequestMethods.HEAD].includes(method)) {
        requestInit.body = JSON.stringify(data);
    }

    const response = await fetch(`${BACKEND_URL}${endpoint}`, requestInit);
    if (response.ok) {
        const json = await response.json();
        return {
            isSuccess: true,
            payload: json,
        }
    } else {
        console.log(response);
        return {
            isSuccess: false,
            error: 'something went wrong'
        }
    }
};
