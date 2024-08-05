import { assert } from 'chai';
import { IChatBrokerMessage } from '../IChatBrokerMessage';
import { ChatBroker } from '../ChatBroker';
import { EChatResponses } from '../EChatResponses';
import { mockChat_1 } from '../../../../test/__mocks__/chat/chats';
import { mockUser_1, mockUser_2 } from '../../../../test/__mocks__/chat/users';

const userToken = '345678iaisdauh';
const chatBroker = new ChatBroker();
const message: IChatBrokerMessage = { 
  token: userToken,
  chat: {
    id: mockChat_1.id,
    users: [mockUser_1.id, mockUser_2.id],
  }
};

describe('Test for API methods of ChatBroker (`setTyping`)', () => {

  it('User typing. Standart response', () => {

    const apiMethod = chatBroker.call('setTyping');
    apiMethod(message, chatBroker)
      .then((result) => {
        const expected = { method: EChatResponses.ok };
        assert.equal(result, expected);
      });
  });

  //TODO: write test for broadcast
});