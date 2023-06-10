import { configureStore } from "@reduxjs/toolkit";
import excelDataSlice from "./features/excelDataSlice";

const store = configureStore({
  reducer: {
    data: excelDataSlice,
  },
});

export default store;
