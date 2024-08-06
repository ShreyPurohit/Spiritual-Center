import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { addUsers, alreadyLoggedIn, deleteUser, fetchAllUsers, fetchUnpaidUsersApi, loginUser, updateUser } from "./fetchUsersApi";
import { IUserState } from "./userSlice";

const extraUserReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
    // Checking And Updating Already Logged In User On Refresh----------------------------  
    builder.addCase(alreadyLoggedIn.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.loggedInUser = `${action.payload.id}-${action.payload.role}-${action.payload.username}`
    })
    builder.addCase(alreadyLoggedIn.pending, (state) => {
        state.loading = true
    })
    builder.addCase(alreadyLoggedIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Fetch Already Logged In User"
    })

    // Fetching Users---------------------------------------------------------------------
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.users
        state.totalUsers = action.payload.totalUsers
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
    });
    builder.addCase(fetchAllUsers.pending, (state) => {
        state.loading = true
    })
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Fetch Users"
    })

    // Adding Users-----------------------------------------------------------------------
    builder.addCase(addUsers.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
    })
    builder.addCase(addUsers.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(addUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Add Users"
    })

    // Login Users------------------------------------------------------------------------
    builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.loggedInUser = `${action.payload._id}-${action.payload.role}-${action.payload.username}`
    })
    builder.addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = String(action.payload) || "Failed To Login User"
    })

    // Deleting Users---------------------------------------------------------------------
    builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = state.user.filter((usr) => usr._id !== action.payload)
    })
    builder.addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = String(action.payload) || "Failed To Delete User"
    })

    // Update Users-----------------------------------------------------------------------
    builder.addCase(updateUser.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.editUser = null
    })
    builder.addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = String(action.payload) || "Failed To Update User"
    })

    // Fetch Unpaid Users-----------------------------------------------------------------
    builder.addCase(fetchUnpaidUsersApi.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.unpaidusers = action.payload
    })
    builder.addCase(fetchUnpaidUsersApi.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(fetchUnpaidUsersApi.rejected, (state, action) => {
        state.loading = false
        state.error = String(action.payload) || "Failed To Fetch Unpaid User List"
    })
}

export default extraUserReducers