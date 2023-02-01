import { createSlice } from "@reduxjs/toolkit";
import { createComment, getComment } from "./commentOperations";

const initialState = {
  comments: [],
  loading: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    // Create comment
    [createComment.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments.push(payload);
    },
    [createComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    // Get comments
    [getComment.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
    },
    [getComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default commentSlice.reducer;
