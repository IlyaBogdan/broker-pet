import { expect } from 'chai';
import { BACKEND_URL } from '../utils/backendRequest';
import fetchMock from 'fetch-mock';
import { WebSocketEntry } from '..';
var Storage = require('node-storage');

const store = new Storage('./store.json');

const accessToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/`;

describe('Test for class WebSocketEntry', async () => {
    it('Success start server', () => {
        fetchMock.mock({
            url,
            method: 'POST',
      
            response: { access_token: accessToken }
        });
    
        const tokenInStore = store.get('accessToken');
        expect(accessToken, tokenInStore);
    });
});