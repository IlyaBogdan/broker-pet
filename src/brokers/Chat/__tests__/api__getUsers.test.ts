import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from '../../../utils/backendRequest';
import { ChatBroker } from '../ChatBroker';
import { IChatBrokerMessage } from '../IChatBrokerMessage';
import { mockGetUsersInfo } from '../__mocks__/api__getUsersInfo.mock';
import { EChatResponses } from '../EChatResponses';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/user/list`;
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = { token: userToken };

describe('Test for API methods of ChatBroker (`getUsers`)', () => {

  it('Info about users in chat successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      
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