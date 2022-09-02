import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: JSON.parse(localStorage.getItem("theme")) || false,
  },

  reducers: {
    themeToggle: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { themeToggle } = themeSlice.actions;
