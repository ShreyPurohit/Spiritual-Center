import { IFetchUsers, IUserChat } from "@/lib/helpers/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import extraUserReducers from "./extraReducers";

export interface IChatSlice {
    userlist: IFetchUsers[],
    messages: IUserChat[],
    loading: boolean,
    error: string | null,
    currentRoom: string | null
}

const initialState: IChatSlice = {
    userlist: [],
    messages: [],
    loading: false,
    error: null,
    currentRoom: null
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: extraUserReducers
})

export const { } = chatSlice.actions
export default chatSlice.reducer