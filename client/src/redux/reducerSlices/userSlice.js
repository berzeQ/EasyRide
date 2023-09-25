import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    token: '',
    id: 'ajfbsdbsdjfbsdjfbsdkjfbsdkjfb',
    userDetails: {},
    isLoggedIn: false
};
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setLoginDetails: (state, actions) => {
        const {token, isLoggedIn, userDetails} = actions.payload;
        return{
          
          ...state,
          token,
          isLoggedIn,
          userDetails,

        }

      },
      changeUserDetails: (state, actions) =>{
        state.userDetails = actions.payload.data;
      },
      logout: (state) => {
        return{
        ...initialState
        }
      },
    }
  });
  
  export const { setLoginDetails, logout,changeUserDetails } = userSlice.actions;
  export default userSlice.reducer;