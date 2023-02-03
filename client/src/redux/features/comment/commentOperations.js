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
      const checkNull = data.includes(null);
      if (checkNull) {
        return data.filter((el) => el !== null);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comment/removeComment",
  async (commentId) => {
    try {
      const { data } = await axios.delete(
        `/posts/delete/${commentId}`,
        commentId
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
