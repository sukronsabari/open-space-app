/**
 * test scenario for talksReducer
 *
 * - talkReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the talks when given by RECEIVE_TALKS action
 *  - should return the talks with the new talk when given by ADD_TALK action
 *  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action
 *
 */

import talksReducer from './reducer';

describe('talk reducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange (mengumpulkan kebutuhan yang diperlukan u. menguji unit)
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action (aksi yang dilakukan u. menguji unit)
    const nextState = talksReducer(initialState, action);

    // assert (bagian yang memeriksa hasil pengujian dari action)
    expect(nextState).toEqual(initialState);
  });

  it('should return talks given by RECEIVE_TALKS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_TALKS',
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talk Test 1',
            user: 'user-1',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
          {
            id: 'talk-2',
            text: 'Talk Test 2',
            user: 'user-2',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
        ],
      },
    };

    // action
    const nextState = talksReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.talks);
  });

  it('should return the talks with the new talk when given by ADD_TALK action', () => {
    // arrange
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];
    const action = {
      type: 'ADD_TALK',
      payload: {
        talk: {
          id: 'talk-2',
          text: 'Talk Test 2',
          user: 'user-2',
          replyTo: '',
          likes: [],
          createdAt: '2022-09-22T10:06:55.588Z',
        },
      },
    };

    // action
    const nextState = talksReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.talk, ...initialState]);
  });

  it('should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action', () => {
    // arrange
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];

    const action = {
      type: 'TOGGLE_LIKE_TALK',
      payload: {
        userId: 'user-1',
        talkId: 'talk-1',
      },
    };

    // action : like talk
    const nextState = talksReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: ['user-1'],
      },
    ]);

    // action : unlike talk
    const nextState2 = talksReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});
