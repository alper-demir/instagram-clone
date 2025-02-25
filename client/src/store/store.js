import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userStore"

export const store = configureStore({
    reducer: { user: userReducer },
})