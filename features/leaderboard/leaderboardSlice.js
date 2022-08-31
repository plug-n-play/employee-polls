import { createSlice } from "@reduxjs/toolkit";

// this information should come from an API when  it's available
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
}

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      state[action.payload.userId].answers[action.payload.questionId] = action.payload.selectedAns;
    },
    addQuestionToLeaderboard: (state, action) => {
      state[action.payload.userId].questions.push(action.payload.questionId);
    }
  }
});

export const { addAnswer, addQuestionToLeaderboard } = leaderboardSlice.actions

export const selectLeaderboard = (state) => state.leaderboard;

export default leaderboardSlice.reducer;
