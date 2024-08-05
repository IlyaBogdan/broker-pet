import { assert } from 'chai';
import { BACKEND_URL } from '../../../utils/backendRequest';
import { ChatBroker } from '../ChatBroker';
import { IChatBrokerMessage } from '../IChatBrokerMessage';
import fetchMock from 'fetch-mock';
import { mockSendMessage, mockOnlineUsers } from '../__mocks__/api__sendMessage.mock';
import { EChatResponses } from '../EChatResponses';
import { mockUser_1, mockUser_2 } from '../../../../test/__mocks__/chat/users';
import { mockMessage_1 } from '../../../../test/__mocks__/chat/messages';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/chat/${mockSendMessage.id}/save-message`;
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = {
  token: userToken,
  chat: {
    users: [mockUser_1, mockUser_2],
    id: 1
  },
  message: mockMessage_1
};

describe('Test for API methods of ChatBroker (`sendMessage`)', () => {

  it('Message successfully sended', () => {
    fetchMock.mock({
      url,
      method: 'PUT',
      body: mockMessage_1,

      response: mockSendMessage
    });
    
    const apiMethod = chatBroker.call('sendMessage');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { 
          method: EChatResponses.activeChat,
          chat: Object.assign(result, { online: mockOnlineUsers })
        }
        assert.equal(result, expected);
      });
  });
});