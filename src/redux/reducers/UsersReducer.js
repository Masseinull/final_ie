import { createSlice } from "@reduxjs/toolkit";

export const UsersReducer = createSlice({
  name: "user",
  initialState: {
    users: [] , is_login:false
  },
  reducers: {
    add_user: (state={}, action) => {
      const user = action.payload;
      state.users.push(user);
      console.log(state.users)
    },
    login: (state={}, action) => {
      const is_login = action.payload;
      state.is_login=is_login
    },
  
  },
});

export const { add_user,login} = UsersReducer.actions;
export default UsersReducer.reducer;
