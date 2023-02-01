import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("auth/register", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      console.log(data);

      return data;
    } catch (error) {}
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("auth/login", { username, password });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {}
  }
);

export const currentUser = createAsyncThunk("auth/currentUser", async () => {
  try {
    const { data } = await axios.get("auth/current");
    return data;
  } catch (error) {}
});
