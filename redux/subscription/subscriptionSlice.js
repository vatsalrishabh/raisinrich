import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {},
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = {};
    },
  },
});

export const { updateForm, resetForm } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;