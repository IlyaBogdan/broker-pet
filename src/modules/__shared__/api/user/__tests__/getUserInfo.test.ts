import { assert } from 'chai';
import { BACKEND_URL } from '@src/utils/backendRequest';
import fetchMock from 'fetch-mock';
import { getUserInfo } from '../get-user-info';
import { mockGetUserInfo } from '../__mocks__/getUserInfo';

const url = `${BACKEND_URL}/api/user`;
const token = '123123safawqeas';

describe('Test for API request getUserInfo()', () => {

  it('Information about user successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      query: { token },
      overwriteRoutes: false,
      
      response: mockGetUserInfo
    });
    
    getUserInfo({ token })
        .then((result) => {
            assert.equal(result, mockGetUserInfo);
        });
  });
});
