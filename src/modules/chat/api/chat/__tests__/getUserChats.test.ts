import { assert } from 'chai';
import { BACKEND_URL } from '@src/utils/backendRequest';
import fetchMock from 'fetch-mock';
import { getUserChats } from '../get-user-chats';
import { mockGetUserChats } from '../__mocks__/getUserChats';

const userId = 123;
const url = `${BACKEND_URL}/api/chat/${userId}`;

describe('Test for API request getUserChats()', () => {

  it('Information about user`s chats successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      overwriteRoutes: false,
      
      response: mockGetUserChats
    });
    
    getUserChats({ userId })
        .then((result) => {
            assert.equal(result, mockGetUserChats);
        });
  });
});