import { IUser } from "@/lib/helpers/interfaces"
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { IUserState } from "./userSlice"

const loginUser = createAsyncThunk(
    'users/login',
    async (formData: FormData, { rejectWithValue }) => {
        const body = Object.fromEntries(formData)
        try {
            const response = await fetch('http://localhost:3000/api/users/login', { method: "POST", body: JSON.stringify(body) })
            if (response.status.toString().includes('4')) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { user } = await response.json()
            if (!user) throw new Error('Invalid user/password/role')
            return user
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const alreadyLoggedIn = createAsyncThunk(
    'users/checkLogin',
    async (thunkApi, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/checkUser')
            if (response.status.toString().includes('4')) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { user } = await response.json()
            return user
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const fetchAllUsers = createAsyncThunk(
    "users/fetchAllUsers",
    async ({ page, limit }: { page: number, limit: number }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/fetchAllUsers?page=${page}&limit=${limit}`)
            if (!response.ok) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const data = await response.json()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const addUsers = createAsyncThunk(
    "users/createUser",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/createuser',
                { method: "POST", body: formData })
            if (!response.ok) {
                throw new Error('Failed to Create User');
            }
            const { user } = await response.json()
            return user
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userID: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/deleteUser/${userID}`, { method: "DELETE" })
            if (response.status.toString().includes('4')) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { id } = await response.json()
            return id
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const updateUser = createAsyncThunk(
    "users/updateUser",
    async (formData: FormData, { getState, rejectWithValue }) => {
        const state = getState() as RootState
        const username = state.user.editUser?.username
        if (!username) throw new Error("User ID Not Found")
        try {
            const response = await fetch(`http://localhost:3000/api/users/updateUser/${username}`, { method: "PUT", body: formData })
            if (!response.ok) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { message } = await response.json()
            return message
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const fetchUnpaidUsersApi = createAsyncThunk(
    "users/unpaidusers",
    async (thunkApi, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/unpaidusers')
            if (!response.ok) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { unpaidUsers } = await response.json()
            return unpaidUsers
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const logoutUsersApi = createAsyncThunk(
    'users/logout',
    async (thunkApi, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState
            let { loggedInUser } = state.user
            const response = await fetch('http://localhost:3000/api/users/logout', {
                method: 'POST',
            });

            if (response.ok) {
                loggedInUser = null
            } else {
                console.error('Failed to log out');
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const setEditUser = (state: IUserState, action: PayloadAction<IUser>) => {
    state.editUser = action.payload
}

export { addUsers, alreadyLoggedIn, deleteUser, fetchAllUsers, fetchUnpaidUsersApi, loginUser, logoutUsersApi, setEditUser, updateUser }

