import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import { ChatBroker } from '../ChatBroker';
import { IChatBrokerMessage } from '../IChatBrokerMessage';
import { BACKEND_URL } from '../../../utils/backendRequest';
import { EChatResponses } from '../EChatResponses';
import { mockCreateChat, mockOnlineUsers } from '../__mocks__/api__createChat.mock';
import { mockMessage_1 } from '../../../../test/__mocks__/chat/messages';
import { mockUser_1, mockUser_2 } from '../../../../test/__mocks__/chat/users';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/chat/${mockCreateChat.id}/save-message`;
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = {
  token: userToken,
  users: [mockUser_1.id, mockUser_2.id]
};

describe('Test for API methods of ChatBroker (`createChat`)', () => {

  it('New chat successfully created', () => {
    fetchMock.mock({
      url,
      method: 'POST',
      body: mockMessage_1,

      response: mockCreateChat
    });
    
    const apiMethod = chatBroker.call('createChat');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { 
          method: EChatResponses.activeChat,
          chat: Object.assign(mockCreateChat, { online: mockOnlineUsers })
        }
        assert.equal(result, expected);
      });
  });
});