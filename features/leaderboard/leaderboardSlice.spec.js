import leaderboardReducer, {
  addAnswer,
  addQuestionToLeaderboard,
} from './leaderboardSlice';

describe('leaderboard reducer', () => {
  const initialState = {
    t: {
      id: 't',
      name: 'Amandeep Singh',
      avatarURL: '/images/1.png',
      answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: '/images/2.jpeg',
      answers: {
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    mtsamis: {
      id: 'mtsamis',
      name: 'Mike Tsamis',
      avatarURL: '/images/3.jpeg',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
        "vthrdm985a262al8qx3do": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },
    zoshikanlu: {
      id: 'zoshikanlu',
      name: 'Zenobia Oshikanlu',
      avatarURL: '/images/4.jpeg',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
      },
      questions: [],
    }
  };

  it('should handle initial state', () => {
    expect(leaderboardReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should assign user', () => {
    const ans = {
      questionId: 'asfasdfsafsaf',
      userId: 'tylermcginnis',
      selectedAns: 'optionOne'
    };
    const actual = leaderboardReducer(initialState, addAnswer(ans));
    expect(actual[ans.userId].answers[ans.questionId]).toEqual('optionOne');
  });

  it('should add question to Leaderboard', () => {
    const question = {
      questionId: 'asfsafsaf',
      userId: 'tylermcginnis',
    };
    const actual = leaderboardReducer(initialState, addQuestionToLeaderboard(question));

    expect(actual[question.userId].questions[actual[question.userId].questions.length - 1]).toEqual('asfsafsaf');
  });
});
