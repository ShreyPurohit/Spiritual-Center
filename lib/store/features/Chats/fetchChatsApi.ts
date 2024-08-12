import { IFetchUsers, IUserChat } from "@/lib/helpers/interfaces"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"

const getChatUsersList = createAsyncThunk(
    'chats/fetchChatList',
    async (thunkapi, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/chats/fetchChatList')
            if (response.status.toString().includes('4')) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { userList } = await response.json()
            return userList as IFetchUsers[]
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const makeGroupInDB = createAsyncThunk(
    'chats/makeRoom',
    async ({ roomID }: { roomID: string }, { getState, rejectWithValue }) => {
        const state = getState() as RootState
        const userID = state.user.loggedInUser?.split('-')[0]
        try {
            const response = await fetch('http://localhost:3000/api/chats/makeGroup', {
                method: "POST",
                body: JSON.stringify({ roomID, userID })
            })
            if (response.status.toString().includes('4')) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { currentRoom } = await response.json()
            return currentRoom as string
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const addMessageToDB = createAsyncThunk(
    'chat/addMessageToDB',
    async (messageData: { roomID: string; text: string; username: string; createdAt: number }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/chats/addMessages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });
            if (!response.ok) {
                throw new Error('Failed to add message');
            }
            const data = await response.json();
            return data.message
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const fetchCurrentRoomMessages = createAsyncThunk(
    'chats/fetchCurrentRoomMessages',
    async ({ currentRoom }: { currentRoom: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/chats/fetchCurrentRoomMessages/${currentRoom}`)
            const { messages } = await response.json()
            return messages as IUserChat[]
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const joinRoomHandlerThunk = createAsyncThunk(
    'chats/joinRoomAndFetchMessages',
    async (roomID: string, { rejectWithValue, dispatch }) => {
        try {
            await (dispatch(makeGroupInDB({ roomID })))
            await (dispatch(fetchCurrentRoomMessages({ currentRoom: roomID })))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export { addMessageToDB, fetchCurrentRoomMessages, getChatUsersList, makeGroupInDB, joinRoomHandlerThunk }
