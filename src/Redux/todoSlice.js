import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getFetch,
  deleteFetch,
  deleteCompletedFetch,
  postFetch,
  putContentFetch,
  putFetch,
} from "./httpRequests";

export const getAsync = createAsyncThunk("todos/getFetch", getFetch);
export const deleteAsync = createAsyncThunk("todos/deleteTodos", deleteFetch);
export const deleteCompletedAsync = createAsyncThunk(
  "todos/deleteCompletedTodos",
  deleteCompletedFetch
);
export const postAsync = createAsyncThunk("todos/postTodos", postFetch);
export const putContentAsync = createAsyncThunk(
  "todos/putContentTodos",
  putContentFetch
);
export const putAsync = createAsyncThunk("todos/patchTodos", putFetch);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    error: null,
    filtered: { all: true, completed: false, active: false },
    isLoading: false,
    deletedItem: null,
    deletedPortal: false,
    updatePortal: false,
    updateItem: null,
    username: JSON.parse(localStorage.getItem("username")),
  },
  reducers: {
    deleteOpen: (state, action) => {
      state.deletedItem = action.payload;
      state.deletedPortal = true;
    },
    cancel: (state) => {
      state.updatePortal = false;
      state.deletedPortal = false;
    },
    updateOpen: (state, action) => {
      state.updateItem = action.payload;
      state.updatePortal = true;
    },
    showAll: (state) => {
      state.filtered.all = true;
      state.filtered.completed = false;
      state.filtered.active = false;
    },
    showCompleted: (state) => {
      state.filtered.all = false;
      state.filtered.completed = true;
      state.filtered.active = false;
    },
    showActive: (state) => {
      state.filtered.all = false;
      state.filtered.completed = false;
      state.filtered.active = true;
    },
    userLog: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: {
    //GET
    [getAsync.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    [getAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getAsync.pending]: (state) => {
      state.isLoading = true;
    },
    //DELETE
    [deleteAsync.fulfilled]: (state, action) => {
      const newSet = state.list.filter((item) => item.id !== action.payload);
      state.list = newSet;
      state.isLoading = false;
    },
    [deleteAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [deleteAsync.pending]: (state) => {
      state.isLoading = true;
    },
    //DELETE COMPLETED
    [deleteCompletedAsync.fulfilled]: (state) => {
      const activeSet = state.list.filter((item) => item.isCompleted === false);
      state.list = activeSet;
      state.isLoading = false;
    },
    [deleteCompletedAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [deleteCompletedAsync.pending]: (state) => {
      state.isLoading = true;
    },
    //POST
    [postAsync.fulfilled]: (state, action) => {
      state.list.push(action.payload);
      state.isLoading = false;
    },
    [postAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [postAsync.pending]: (state) => {
      state.isLoading = true;
    },
    //PUT CONTENT
    [putContentAsync.fulfilled]: (state, action) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list[index].content = action.payload.content;
      state.isLoading = false;
    },
    [putContentAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [putContentAsync.pending]: (state) => {
      state.isLoading = true;
    },
    //PUT
    [putAsync.fulfilled]: (state, action) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list[index].isCompleted = action.payload.isCompleted;
      state.isLoading = false;
    },
    [putAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [putAsync.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export default todoSlice.reducer;
export const todoActions = todoSlice.actions;

export const filterHandler = (state) => {
  if (state.todos.filtered.all) {
    return state.todos.list;
  }
  if (state.todos.filtered.active) {
    return state.todos.list.filter((item) => item.isCompleted === false);
  }
  if (state.todos.filtered.completed) {
    return state.todos.list.filter((item) => item.isCompleted === true);
  }
};
