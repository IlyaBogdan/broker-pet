import { assert } from 'chai';
import { BACKEND_URL } from '@src/utils/backendRequest';
import { ChatBroker } from '..';
import { IChatBrokerMessage } from '../message';
import fetchMock from 'fetch-mock';
import { EChatResponses } from '../response';
import { mockChatList, mockOnlineUsers } from '../__mocks__/chatList.mock';
import { mockUser_1 } from '@mocks/chat/users';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/chat/list?user=${mockUser_1.id}`;
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = { token: userToken };

describe('Test for API methods of ChatBroker (`chatList`)', () => {

  it('List of user`s chats successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      
      response: mockChatList
    });
    
    const apiMethod = chatBroker.call('getUsers');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { 
          method: EChatResponses.activeChat,
          chat: { ...mockChatList, online: mockOnlineUsers }
        };
        assert.equal(result, expected);
      });
  });
});