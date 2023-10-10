import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: "root",
    initialState: {
        isLogin: false
    },
    reducers: {
        Login: state => {
            state.isLogin = true
        },
        LogOut: state => {
            state.icon = false
        },
    }
})

export default loginSlice

export const loginAction = loginSlice.actions
