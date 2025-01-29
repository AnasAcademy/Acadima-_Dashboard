import { configureStore } from '@reduxjs/toolkit';
import singlePageProgramData from './slices/fetchSinglePageProgramData';
export const store = configureStore({
  reducer: {
    onePageProgramData: singlePageProgramData,
  },
});


