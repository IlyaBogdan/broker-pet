import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from '@src/libs/request/request';
import { mockUserInfo } from '../__mocks__/pull';
import { ChatBroker } from '..';
import { EChatResponses } from '../response';
import { TPullBrokerMessageFormat } from '../methods/pull/message';
import { mockUser_1 } from '@mocks/chat/users';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/user?token=${userToken}`;
const chatBroker = new ChatBroker();
const message: TPullBrokerMessageFormat = {
  token: userToken,
  user: mockUser_1,
  date: '2024-08-15T15:02:17.080Z'
};

describe('Test for API methods of ChatBroker (`pull`)', () => {

  it('Info about connected user successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      overwriteRoutes: false,
      
      response: mockUserInfo
    });
    
    const apiMethod = chatBroker.call('pull');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { method: EChatResponses.setUser, user: mockUserInfo };
        assert.equal(result, expected);
      });
  });
});