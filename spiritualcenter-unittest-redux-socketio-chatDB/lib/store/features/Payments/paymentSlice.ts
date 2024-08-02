import { createSlice } from "@reduxjs/toolkit";
import { IPayment } from "@/lib/helpers/interfaces";
import extraPaymentsReducers from "./extraReducers";

export interface IPaymentsState {
    payments: IPayment[],
    myPayments: IPayment[]
    loading: boolean,
    error: string | null
}

const initialState: IPaymentsState = {
    payments: [],
    myPayments: [],
    loading: false,
    error: null
}

export const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: extraPaymentsReducers
})

export const { } = paymentSlice.actions
export default paymentSlice.reducer