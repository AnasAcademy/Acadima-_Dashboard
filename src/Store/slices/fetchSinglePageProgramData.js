import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axios';
import React, { createContext, useState, useEffect } from "react";

export const fetchSinglePageProgramDataSlice = createAsyncThunk(
  'programs/singlePageProgram',
  async () => {
    try {
      const response = await axiosInstance.get('/programs');
      return response.data.data;
    } catch (error) {
      return console.error(error);
    }
  }
);

const singlePageProgramSlice = createSlice({
  name: 'single_page_program_slice',
  initialState: {
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePageProgramDataSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSinglePageProgramDataSlice.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchSinglePageProgramDataSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default singlePageProgramSlice.reducer;
