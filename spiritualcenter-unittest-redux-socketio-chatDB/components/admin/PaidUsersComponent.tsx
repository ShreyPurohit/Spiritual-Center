"use client";

import { classSwitch } from "@/lib/helpers/helperFunctions";
import { allPaymentsApi } from "@/lib/store/features/Payments/fetchPaymentsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Loader = dynamic(() => import("../common/Loader"));
import { toast } from "react-hot-toast";

const PaidUsersComponent = () => {
  const dispatch = useAppDispatch();
  const { payments, loading, error } = useAppSelector((state) => state.payment);

  useEffect(() => {
    fetchPaidInEffect()
  }, [dispatch]);

  const fetchPaidInEffect = async () => {
    try {
      const resultAction = await dispatch(allPaymentsApi())
      if (allPaymentsApi.fulfilled.match(resultAction)) {
        toast.success("Fetched Paid Users List")
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="overflow-x-auto text-center m-2 text-sm lg:text-base">
      {loading ? (<Loader text="Fetching All Payments" />) : (
        <table id="allPaymentList" className="md:w-full table table-auto min-w-max" >
          <thead>
            <tr className="text-lg font-semibold tracking-wide">
              <td>User Name</td>
              <td>Full Name</td>
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
                className={classSwitch(pays.payments[index].amount)?.classname}
                style={{
                  backgroundColor: classSwitch(pays.payments[index].amount)?.style,
                  color: classSwitch(pays.payments[index].amount)?.text,
                }} >
                <td>{pays.username}</td>
                <td>{pays.fullName.firstName} {pays.fullName.middleName} {pays.fullName.lastName}</td>
                <td>{pays.payments[index].month}</td>
                <td>{pays.payments[index].year}</td>
                <td>{pays.payments[index].amount}</td>
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
