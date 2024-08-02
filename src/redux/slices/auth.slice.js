import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  tokens: null,
  loading: false,
  submitting: false,
  company: null,
  showLogout: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSubmitting(state, action) {
      state.submitting = action.payload;
    },
    setCompany(state, action) {
      state.company = action.payload;
    },
    toggleShowLogout(state, action) {
      state.showLogout = !state.showLogout;
    },
  },
});

export const {
  setUser,
  setTokens,
  setLoading,
  setSubmitting,
  setCompany,
  toggleShowLogout,
} = authSlice.actions;

export default authSlice.reducer;
