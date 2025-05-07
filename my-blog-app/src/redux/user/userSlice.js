import { createSlice } from '@reduxjs/toolkit'

const initialState  = {
    currentUser : null,
    error : null,
    loading : false

}
//Here we have only 3 states start , success or error, Now we will use this logic in our sign in
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess : ( state, action )  => {//Here we will have two information state and action as action is the information we get back and we work
            state.currentUser = action.payload; //The response we get back
            state.loading = false;
            state.error = null;
        } ,
        signInFailure : ( state, action ) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart : ( state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess : ( state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure : ( state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },

        deleteUserStart : (state) => {
            state.loading = true;
            state.error = null ;
        },
        deleteUserSuccess : (state) => {
           state.currentUser = null;
           state.loading = false;
           state.error = null;
        },
        deleteUserFailure : (state,action) => {
            state.loading =false;
            state.error = action.payload;
        },

         signoutSuccess : (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
         } ,                                 
    },
});
export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure , deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess} = userSlice.actions;

export default userSlice.reducer;// wewill import this in ./redux/store.js