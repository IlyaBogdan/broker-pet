import { assert } from 'chai';
import { EChatResponses } from '../EChatResponses';
import { IChatBrokerMessage } from '../IChatBrokerMessage';
import { ChatBroker } from '../ChatBroker';
import { BACKEND_URL } from '../../../utils/backendRequest';
import fetchMock from 'fetch-mock';
import { mockGetChat, mockOnlineUsers } from '../__mocks__/api__getChat.mock';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/chat/${mockGetChat.id}`;
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = { token: userToken };

describe('Test for API methods of ChatBroker (`getChat`)', () => {

  it('Info about chat successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      
      response: mockGetChat
    });
    
    const apiMethod = chatBroker.call('getUsers');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { method: EChatResponses.activeChat, chat: Object.assign(mockGetChat, { online: mockOnlineUsers }) };
        assert.equal(result, expected);
      });
  });

  //TODO: write test for broadcast
});