import { assert } from 'chai';
import { BACKEND_URL } from '@src/libs/request/request';
import fetchMock from 'fetch-mock';
import { mockMessage_1 } from '@mocks/chat/messages';
import { mockMessageSuccesfullySaved, mockSaveMessage } from '../__mocks__/saveMessage';
import { saveMessage } from '../message/save';
import { mockUser_1 } from '@mocks/chat/users';

const chatId = 123;
const url = `${BACKEND_URL}/api/chat/${chatId}/save-message`;
const params = { 
    chatId,
    message: {
      message: 'hello',
      author: mockUser_1,
      date: '2024-08-15T15:02:17.080Z'
    }
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
        assert.equal(result, mockMessageSuccesfullySaved);
      });
  });
});