import { configureStore } from "@reduxjs/toolkit";
import conversation from "./conversation";

const store = configureStore({
  reducer: {
    conversation,
  },
});

export default store;

