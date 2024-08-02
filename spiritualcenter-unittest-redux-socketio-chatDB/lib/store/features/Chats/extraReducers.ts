import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IChatSlice } from "./chatSlice";
import { addMessageToDB, fetchCurrentRoomMessages, getChatUsersList, makeGroupInDB } from './fetchChatsApi';

const extraUserReducers = (builder: ActionReducerMapBuilder<IChatSlice>) => {
    // Fetching All Chat List Users-----------------------------------------------------
    builder.addCase(getChatUsersList.fulfilled, (state, action) => {
        state.userlist = action.payload
        state.loading = false
        state.error = null

    })
    builder.addCase(getChatUsersList.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(getChatUsersList.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Fetch Users"
    })

    // Making Group In DB----------------------------------------------------------------
    builder.addCase(makeGroupInDB.fulfilled, (state, action) => {
        state.currentRoom = action.payload
        state.loading = false
        state.error = null
    })
    builder.addCase(makeGroupInDB.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(makeGroupInDB.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Fetch Users"
    })

    // Adding Messages--------------------------------------------------------------------
    builder.addCase(addMessageToDB.fulfilled, (state) => {
        state.loading = false
        state.error = null
    })
    builder.addCase(addMessageToDB.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(addMessageToDB.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Add Message"
    })

    // Fetching Current Room Messages-----------------------------------------------------
    builder.addCase(fetchCurrentRoomMessages.fulfilled, (state, action) => {
        state.messages = action.payload
        state.loading = false
        state.error = null
    })
    builder.addCase(fetchCurrentRoomMessages.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(fetchCurrentRoomMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Fetch Message"
    })
}

export default extraUserReducers