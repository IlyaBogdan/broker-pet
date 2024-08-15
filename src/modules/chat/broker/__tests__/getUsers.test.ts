import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from '@src/utils/backendRequest';
import { ChatBroker } from '..';
import { IChatBrokerMessage } from '../message';
import { mockGetUsersInfo } from '../__mocks__/getUsersInfo';
import { EChatResponses } from '../response';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/user/list`;
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = { token: userToken };

describe('Test for API methods of ChatBroker (`getUsers`)', () => {
  fetchMock.reset();

  it('Info about users in chat successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      overwriteRoutes: false,
      
      response: mockGetUsersInfo
    });
    
    const apiMethod = chatBroker.call('getUsers');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { method: EChatResponses.setUserList, users: mockGetUsersInfo };
        assert.equal(result, expected);
      });
  });
});