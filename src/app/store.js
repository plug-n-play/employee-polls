import { configureStore } from "@reduxjs/toolkit";

import user from "@/features/user/userSlice";
import questions from "@/features/questions/questionsSlice";
import leaderboard from "@/features/leaderboard/leaderboardSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      user,
      questions,
      leaderboard,
    }
  });
}

const store = makeStore();

export default store;
