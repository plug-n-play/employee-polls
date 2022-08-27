import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => {
      return action.payload
    },
    setSelectedAns: (state, action) => {
      state.answers[action.payload.key] = action.payload.value;
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload.id)
    }
  }
});
export const { setUser, setSelectedAns, addQuestion } = userSlice.actions

export const selectUser = (state) => state.user;

export default userSlice.reducer;
