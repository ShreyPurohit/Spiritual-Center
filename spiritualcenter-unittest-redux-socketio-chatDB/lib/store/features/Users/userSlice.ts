import { IUser } from "@/lib/helpers/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import extraUserReducers from "./extraReducers";
import { logoutUser, setEditUser } from "./fetchUsersApi";

export interface IUserState {
    loggedInUser: string | null,
    editUser: IUser | null,
    user: IUser[],
    unpaidusers: IUser[],
    loading: boolean,
    error: string | null
    totalUsers: number,
    totalPages: number,
    currentPage: number,
}

const initialState: IUserState = {
    loggedInUser: null,
    editUser: null,
    user: [],
    unpaidusers: [],
    loading: false,
    error: null,
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutReducer: logoutUser,
        editUser: setEditUser
    },
    extraReducers: extraUserReducers
})

export const { logoutReducer, editUser } = userSlice.actions
export default userSlice.reducer