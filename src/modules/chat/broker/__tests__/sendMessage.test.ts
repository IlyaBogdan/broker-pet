import { assert } from 'chai';
import { BACKEND_URL } from '@src/libs/request/request';
import { ChatBroker } from '..';
import fetchMock from 'fetch-mock';
import { mockSendMessage, mockOnlineUsers } from '../__mocks__/sendMessage';
import { EChatResponses } from '../response';
import { mockUser_1 } from '@mocks/chat/users';
import { mockMessage_1 } from '@mocks/chat/messages';
import { TSendMessageType } from '../methods/sendMessage/message';
import { mockChat_1 } from '@mocks/chat/chats';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/chat/${mockSendMessage.id}/save-message`;
const chatBroker = new ChatBroker();
const message: TSendMessageType = {
  method: 'sendMessage',
  token: userToken,
  chat: mockChat_1,
  message: {
    message: 'hello',
    author: mockUser_1,
    date: '2024-08-15T15:02:17.080Z'
  },
  date: '2024-08-15T15:02:17.080Z'
};

describe('Test for API methods of ChatBroker (`sendMessage`)', () => {

  it('Message successfully sended', () => {
    fetchMock.mock({
      url,
      method: 'PUT',
      body: mockMessage_1,
      overwriteRoutes: false,

      response: mockSendMessage
    });
    
    const apiMethod = chatBroker.call('sendMessage');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { 
          method: EChatResponses.activeChat,
          chat: { ...result, online: mockOnlineUsers }
        }
        assert.equal(result, expected);
      });
  });
});