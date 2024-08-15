import { assert } from 'chai';
import { EChatResponses } from '../response';
import { IChatBrokerMessage } from '../message';
import { ChatBroker } from '..';
import { BACKEND_URL } from '@src/libs/request/request';
import fetchMock from 'fetch-mock';
import { mockGetChat, mockOnlineUsers } from '../__mocks__/getChat';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/chat/${mockGetChat.id}`;
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = { token: userToken };

describe('Test for API methods of ChatBroker (`getChat`)', () => {

  it('Info about chat successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      overwriteRoutes: false,
      
      response: mockGetChat
    });
    
    const apiMethod = chatBroker.call('getUsers');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { method: EChatResponses.activeChat, chat: { ...mockGetChat, online: mockOnlineUsers } };
        assert.equal(result, expected);
      });
  });

  //TODO: write test for broadcast
});