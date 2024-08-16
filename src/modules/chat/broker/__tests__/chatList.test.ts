import { assert } from 'chai';
import { BACKEND_URL } from '@src/libs/request/request';
import { ChatBroker } from '..';
import fetchMock from 'fetch-mock';
import { EChatResponses } from '../response';
import { mockChatList, mockOnlineUsers } from '../__mocks__/chatList';
import { mockUser_1 } from '@mocks/chat/users';
import { TChatListParams } from '../methods/chatList/message';

const url = `${BACKEND_URL}/api/chat/list?user=${mockUser_1.id}`;
const chatBroker = new ChatBroker();
const message: TChatListParams = { user: mockUser_1 };

describe('Test for API methods of ChatBroker (`chatList`)', () => {

  it('List of user`s chats successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      overwriteRoutes: false,
      
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