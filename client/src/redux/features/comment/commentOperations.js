import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
