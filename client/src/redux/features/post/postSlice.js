import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  removePost,
  updatePost,
} from "./postOperations";

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // Create post
    [createPost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts.push(payload);
    },
    [createPost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    // Get all posts

    [getAllPosts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload.posts;
      state.popularPosts = payload.popularPosts;
    },
    [getAllPosts.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // Updated post

    [updatePost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const index = state.posts.findIndex((post) => post._id === payload._id);
      state.posts[index] = payload;
    },
    [updatePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // Remove post

    [removePost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== payload._id);
    },
    [removePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
