"use client";

import { classSwitch } from "@/lib/helpers/helperFunctions";
import { allPaymentsApi } from "@/lib/store/features/Payments/fetchPaymentsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Loader = dynamic(() => import("../common/Loader"));

const PaidUsersComponent = () => {
  const dispatch = useAppDispatch();
  const { payments, loading, error } = useAppSelector((state) => state.payment);

  useEffect(() => {
    dispatch(allPaymentsApi());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto text-center m-2 text-sm lg:text-base">
      {loading ? (
        <Loader text="Fetching All Payments" />
      ) : (
        <table
          id="allPaymentList"
          className="md:w-full table table-auto min-w-max"
        >
          <thead>
            <tr className="text-lg font-semibold tracking-wide">
              <td>Made By</td>
              <td>Month</td>
              <td>Year</td>
              <td>Total Amount</td>
            </tr>
          </thead>
          <tbody>
            {payments.map((pays, index) => (
              <tr
                key={pays._id}
                id={`payment-${index}`}
                className={classSwitch(pays.amount)?.classname}
                style={{
                  backgroundColor: classSwitch(pays.amount)?.style,
                  color: classSwitch(pays.amount)?.text,
                }}
              >
                <td>{pays.made_by.toString()}</td>
                <td>{pays.month}</td>
                <td>{pays.year}</td>
                <td>{pays.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
};
export default PaidUsersComponent;
