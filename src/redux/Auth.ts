import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { Strings } from '../resources/Strings';

const authReducer = createSlice({
  name: 'authReducer',
  initialState: { loginData: {loginStatus:false,language:'En'} },
  reducers: {
    loginUpdate: (state, action) => {
      state.loginData.loginStatus = action.payload;
    },
    languageUpdate: (state, action) => {
      Strings.setLanguage(action.payload)
      state.loginData.language = action.payload;
    },
  },
});

export const { loginUpdate, languageUpdate } =
  authReducer.actions;
export default authReducer.reducer;

