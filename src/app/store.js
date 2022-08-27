import { configureStore } from "@reduxjs/toolkit";

import user from "@/features/user/userSlice";
import questions from "@/features/questions/questionsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      user,
      questions,
    }
  });
}

const store = makeStore();

export default store;
