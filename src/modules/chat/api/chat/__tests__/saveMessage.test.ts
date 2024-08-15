import { assert } from 'chai';
import { BACKEND_URL } from '@src/utils/backendRequest';
import fetchMock from 'fetch-mock';
import { mockMessage_1 } from '@mocks/chat/messages';
import { mockSaveMessage } from '../__mocks__/saveMessage';
import { saveMessage } from '../message/save';

const chatId = 123;
const url = `${BACKEND_URL}/api/chat/${chatId}/save-message`;
const params = { 
    chatId,
    message: mockMessage_1
};

describe('Test for API request saveMessage()', () => {

  it('Message successfully saved', () => {
    fetchMock.mock({
      url,
      method: 'PUT',
      body: mockMessage_1,
      overwriteRoutes: false,

      response: mockSaveMessage
    });
    
    saveMessage(params)
      .then((result) => {
        assert.equal(result, mockSaveMessage);
      });
  });
});