/**
 * List of allowed methods on chat broker
 */
export enum EChatResponses {

    /**
     * Set user info on client
     */
    setUser = 'setUser',

    /**
     * Standart success response
     */
    ok = 'ok',

    /**
     * Set active chat on client
     */
    activeChat = 'activeChat',

    /**
     * Set user`s dialogs on client
     */
    userDialogs = 'userDialogs',

    /**
     * Set user list on client
     */
    setUserList = 'setUserList',

    /**
     * Set online user list on client
     */
    usersOnline = 'usersOnline'
};
