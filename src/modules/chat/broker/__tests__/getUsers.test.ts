import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from '@src/libs/request/request';
import { ChatBroker } from '..';
import { mockGetUsersInfo } from '../__mocks__/getUsersInfo';
import { EChatResponses } from '../response';
import { TGetUsersMessage } from '../methods/getUsers/message';
import { mockUser_1 } from '@mocks/chat/users';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/user/list`;
const chatBroker = new ChatBroker();
const message: TGetUsersMessage = {
  token: userToken,
  user: mockUser_1
};

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