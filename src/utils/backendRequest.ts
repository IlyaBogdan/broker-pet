import fetch from 'node-fetch';
import { ERequestMethods } from './ERequestMethods';
var Storage = require('node-storage');

const store = new Storage('./store.json');

const BACKEND_URL: string = `${process.env.BACKEND_URL}/api/broker`;
const BROKER_TOKEN: string|null = store.get('access_token');

/**
 * Request to backend from broker
 * 
 * @param {string} endpoint endpoint for backend request
 * @param {any} data request body
 * @param { ERequestMethods } method request method
 * @returns {Promise<any>}
 */
const request = async (endpoint: string, data: any, method: ERequestMethods): Promise<any> => {
    let requestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (BROKER_TOKEN) {
        requestInit.headers['X-Broker-Token'] = BROKER_TOKEN;
    }
    if (['GET', 'HEAD'].indexOf(method) == -1) {
        requestInit['body'] = JSON.stringify(data);
    }

    return fetch(`${BACKEND_URL}${endpoint}`, requestInit)
        .then((response) => {
            return response.json();
        })
}

export { request, BACKEND_URL };