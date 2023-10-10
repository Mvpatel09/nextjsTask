import { configureStore } from '@reduxjs/toolkit'
import loginAction from './slice'

const store = configureStore({
    reducer: {
        data: loginAction.reducer
    }
})

export default store