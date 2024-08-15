import { assert } from 'chai';
import { BACKEND_URL } from '@src/libs/request/request';
import fetchMock from 'fetch-mock';
import { getChatInfo } from '../get-chat-info';
import { mockGetChatInfo, mockChatInfoSuccesfullyAccepted } from '../__mocks__/getChatInfo';

const chatId = 123;
const url = `${BACKEND_URL}/api/chat/${chatId}`;

describe('Test for API request getChatInfo()', () => {

  it('Information about chat successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      overwriteRoutes: false,
      
      response: mockGetChatInfo
    });
    
    getChatInfo({ chatId })
        .then((result) => {
            assert.equal(result, mockChatInfoSuccesfullyAccepted);
        });
  });
});
