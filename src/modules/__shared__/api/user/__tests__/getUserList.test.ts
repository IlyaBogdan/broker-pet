import { assert } from 'chai';
import { BACKEND_URL } from '@src/libs/request/request';
import fetchMock from 'fetch-mock';
import { mockGetUserList, mockUserListSuccessfullyAccepted } from '../__mocks__/getUserList';
import { getUserList } from '../get-user-list';

const url = `${BACKEND_URL}/api/user/list`;

describe('Test for API request getUserList()', () => {

  it('List of user`s successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      overwriteRoutes: false,
      
      response: mockGetUserList
    });
    
    getUserList()
        .then((result) => {
            assert.equal(result, mockUserListSuccessfullyAccepted);
        });
  });
});
