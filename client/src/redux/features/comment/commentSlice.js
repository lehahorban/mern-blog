import { createSlice } from "@reduxjs/toolkit";
import { createComment, getComment, removeComment } from "./commentOperations";

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

    // Delete comments
    // Remove post

    [removeComment.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [removeComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = state.comments.filter(
        (comment) => comment._id !== payload._id
      );
    },
    [removeComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default commentSlice.reducer;
