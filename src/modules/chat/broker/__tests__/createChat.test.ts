import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import { ChatBroker } from '..';
import { BACKEND_URL } from '@src/libs/request/request';
import { EChatResponses } from '../response';
import { mockCreateChat, mockOnlineUsers } from '../__mocks__/createChat';
import { mockMessage_1 } from '@mocks/chat/messages';
import { mockUser_1, mockUser_2 } from '@mocks/chat/users';
import { TCreateChatMessage } from '../methods/createChat/message';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/chat/${mockCreateChat.id}/save-message`;
const chatBroker = new ChatBroker();
const message: TCreateChatMessage = {
  token: userToken,
  users: [mockUser_1.id, mockUser_2.id]
};

describe('Test for API methods of ChatBroker (`createChat`)', () => {

  it('New chat successfully created', () => {
    fetchMock.mock({
      url,
      method: 'POST',
      body: mockMessage_1,
      overwriteRoutes: false,

      response: mockCreateChat
    });
    
    const apiMethod = chatBroker.call('createChat');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { 
          method: EChatResponses.activeChat,
          chat: { ...mockCreateChat, online: mockOnlineUsers }
        }
        assert.equal(result, expected);
      });
  });
});
