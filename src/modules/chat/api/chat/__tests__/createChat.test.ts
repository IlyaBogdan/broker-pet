import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from '@src/libs/request/request';
import { mockCreateChat, mockChatSuccessfullyCreated } from '../__mocks__/createChat';
import { mockUser_1, mockUser_2 } from '@mocks/chat/users';
import { createChat } from '../create';
import { EChatTypes } from '@src/modules/chat/dto/chat';

const url = `${BACKEND_URL}/api/chat`;
const params = {
  type: EChatTypes.DIALOG,
  users: [mockUser_1.id, mockUser_2.id]
};

describe('Test for API request createChat()', () => {

  it('New chat successfully created', () => {
    fetchMock.mock({
      url,
      method: 'POST',
      body: params,
      overwriteRoutes: false,

      response: mockCreateChat
    });
    
    createChat(params)
      .then((result) => {
        assert.equal(result, mockChatSuccessfullyCreated);
      });
  });
});