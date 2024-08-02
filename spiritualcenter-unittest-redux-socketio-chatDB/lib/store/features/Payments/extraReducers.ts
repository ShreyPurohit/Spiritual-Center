import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { allPaymentsApi, makePayment, myPaymentsApi } from "./fetchPaymentsApi";
import { IPaymentsState } from "./paymentSlice";

const extraPaymentsReducers = (builder: ActionReducerMapBuilder<IPaymentsState>) => {
    // Fetching All Payments---------------------------------------------------------------------
    builder.addCase(allPaymentsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.payments = action.payload
    })
    builder.addCase(allPaymentsApi.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(allPaymentsApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Fetch All Payments"
    })

    // Make Payment------------------------------------------------------------------------------
    builder.addCase(makePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.payments.findIndex(payment =>
            payment.made_by.toString() === action.payload.made_by &&
            payment.month === action.payload.month &&
            payment.year === action.payload.year
        );
        if (index !== -1) {
            state.payments[index] = action.payload;
        } else {
            state.payments.push(action.payload);
        }
    });
    builder.addCase(makePayment.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(makePayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed To Make Payment"
    })

    // Fetch My Payments-------------------------------------------------------------------------
    builder.addCase(myPaymentsApi.fulfilled, (state, action) => {
        state.loading = false
        state.myPayments = action.payload
        state.error = null
    })
    builder.addCase(myPaymentsApi.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(myPaymentsApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Falied To Fetch My Payments"
    })
}

export default extraPaymentsReducers
