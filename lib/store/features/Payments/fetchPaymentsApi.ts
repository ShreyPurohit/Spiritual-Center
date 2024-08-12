import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const makePayment = createAsyncThunk(
    'devotee/payonline',
    async (formData: FormData, { getState, rejectWithValue }) => {
        const state = getState() as RootState
        const made_by = state.user.loggedInUser?.split('-')[0]
        if (!made_by) throw new Error("User ID Not Found")
        formData.append('made_by', made_by)
        const body = Object.fromEntries(formData)
        try {
            const response = await fetch('http://localhost:3000/api/payments/makePayment/',
                { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            if (!response.ok) {
                throw new Error('Failed to Make Payment');
            }
            const { payment } = await response.json()
            return payment
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const myPaymentsApi = createAsyncThunk(
    'devotee/myPayments',
    async (thunkApi, { getState, rejectWithValue }) => {
        const state = getState() as RootState
        const userID = state.user.loggedInUser?.split('-')[0]
        if (!userID) throw new Error("User ID Not Found")
        try {
            const response = await fetch(`http://localhost:3000/api/payments/myPayments/${userID}`)
            if (!response.ok) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { myPayments } = await response.json()
            return myPayments
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const allPaymentsApi = createAsyncThunk(
    'admin/allPayments',
    async (thunkApi, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/payments/allPayments')
            if (!response.ok) {
                const { message } = await response.json()
                throw new Error(message);
            }
            const { allPayments } = await response.json()
            return allPayments
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export { allPaymentsApi, makePayment, myPaymentsApi };
