import { createSlice} from '@reduxjs/toolkit'; 

export const usersSlice = createSlice({
    name:"users",
    initialState:{
        currentUser: null
    },
    reducers: {
        setUser: (users , action) => {
            users.currentUser = action.payload;
        }
    }
})

export default usersSlice.reducer;
export const {setUser} = usersSlice.actions;
export const selectUsers = (state) => {
    return state.users;
};
