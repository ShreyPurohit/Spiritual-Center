import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/Users/userSlice'
import paymentReducer from './features/Payments/paymentSlice'
import chatReducer from './features/Chats/chatSlice'

export const centralStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            payment: paymentReducer,
            chat: chatReducer
        },
        devTools: process.env.NODE_ENV !== 'production'
    })
}

export type AppStore = ReturnType<typeof centralStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']