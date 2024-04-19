import { createSlice } from "@reduxjs/toolkit";

// this reducer has only one job to keep track if an user is logged in or not.

// creating an initial sate object which has two vlaues of userStatus and userData
const initialState = {
    userStatus: false,
    userData: null
}

// creating reducer
const userSlice = createSlice(
    {
        name: "auth",
        initialState: initialState,
        reducers: {
            login: (state, action) => {
                state.userStatus = true,
                state.userData = action.payload.userData
            },
            logout: (state) => {
                state.userStatus = false,
                state.userData = null
            }
        }
    }
)

const { login, logout } = userSlice.actions

export { login, logout }

export default userSlice.reducer