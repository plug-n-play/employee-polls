import userReducer, {
  setUser,
  setSelectedAns,
  addQuestion,
} from './userSlice';

describe('user reducer', () => {
  const initialState = {
    answers: {},
    questions: [],
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should assign user', () => {
    const user = {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: '/images/2.jpeg',
      answers: {
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    };

    const actual = userReducer(initialState, setUser(user));
    expect(actual.id).toEqual('tylermcginnis');
  });

  it('should assign selected answer', () => {
    const payload = {
      key: 'asdfasfsaf',
      value: 'optionOne'
    };
    const actual = userReducer(initialState, setSelectedAns(payload));
    expect(actual.answers[payload.key]).toEqual('optionOne');
  });

  it('should add a Question', () => {
    const question = {
      id: 'asdfasdfsdfgdfgdd',
      userId: 'tylermcginnis',
    };
    const actual = userReducer(initialState, addQuestion(question));

    expect(actual.questions.length).toEqual(1);
    expect(actual.questions[actual.questions.length - 1]).toEqual('asdfasdfsdfgdfgdd');
  });
});
