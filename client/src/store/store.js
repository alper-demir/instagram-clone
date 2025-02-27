import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userStore"
import modalReducer from "./modalStore"

export const store = configureStore({
    reducer: { user: userReducer, modal: modalReducer },
})