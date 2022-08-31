import { createSlice } from "@reduxjs/toolkit";

// this information should come from an API when  it's available
const initialState = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 't',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['t'],
      text: 'Build our new application with Javascript',
    },
    optionTwo: {
      votes: [],
      text: 'Build our new application with Typescript'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'mtsamis',
    timestamp: 1468479767190,
    optionOne: {
      votes: ['mtsamis', 't'],
      text: 'hire more frontend developers',
    },
    optionTwo: {
      votes: [],
      text: 'hire more backend developers'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 't',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'conduct a release retrospective 1 week after a release',
    },
    optionTwo: {
      votes: ['t'],
      text: 'conduct release retrospectives quarterly'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'have code reviews conducted by peers',
    },
    optionTwo: {
      votes: ['t'],
      text: 'have code reviews conducted by managers'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'take a course on ReactJS',
    },
    optionTwo: {
      votes: ['mtsamis'],
      text: 'take a course on unit testing with Jest'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'mtsamis',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['mtsamis', 'zoshikanlu'],
      text: 'deploy to production once every two weeks',
    },
    optionTwo: {
      votes: ['tylermcginnis'],
      text: 'deploy to production once every month'
    }
  },
}

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    add: (state, action) => {
      state[`${action.payload.id}`] = action.payload;
    },
    addAns: (state, action) => {
      state[action.payload.questionId][action.payload.selectedAns].votes.push(action.payload.userId);
    }
  }
});

export const { add, addAns } = questionsSlice.actions

export const selectQuestions = (state) => state.questions;

export default questionsSlice.reducer;
