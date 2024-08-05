import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from '../../../utils/backendRequest';
import { mockUserInfo } from '../__mocks__/api__pull.mock';
import { ChatBroker } from '../ChatBroker';
import { EChatResponses } from '../EChatResponses';
import { IChatBrokerMessage } from '../IChatBrokerMessage';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/user?token=${userToken}`;
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = { token: userToken };

describe('Test for API methods of ChatBroker (`pull`)', () => {

  it('Info about connected user successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      
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