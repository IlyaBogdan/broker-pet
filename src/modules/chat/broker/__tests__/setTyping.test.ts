import { assert } from 'chai';
import { ChatBroker } from '..';
import { EChatResponses } from '../response';
import { mockChat_1 } from '@mocks/chat/chats';
import { mockUser_1 } from '@mocks/chat/users';
import { TSetTypingBrokerMessage } from '../methods/setTyping/message';

const userToken = '345678iaisdauh';
const chatBroker = new ChatBroker();
const message: TSetTypingBrokerMessage = {
  method: 'setTyping',
  token: userToken,
  chat: mockChat_1,
  date: '2024-08-15T15:02:17.080Z',
  user: mockUser_1,
  typing: true,
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