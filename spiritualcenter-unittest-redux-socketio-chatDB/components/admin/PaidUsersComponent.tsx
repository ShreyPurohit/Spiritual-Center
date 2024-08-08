"use client";

import { allPaymentsApi } from "@/lib/store/features/Payments/fetchPaymentsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
const Loader = dynamic(() => import("../common/Loader"));

const PaidUsersComponent = () => {
  const dispatch = useAppDispatch();
  const { payments, loading, error } = useAppSelector((state) => state.payment);

  useEffect(() => {
    fetchPaidInEffect()
  }, [dispatch]);

  const fetchPaidInEffect = async () => {
    try {
      const toastID = toast.loading("Fetching List...")
      const resultAction = await dispatch(allPaymentsApi())
      if (allPaymentsApi.fulfilled.match(resultAction)) {
        toast.success("Fetched Paid Users List", { id: toastID })
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="overflow-x-auto text-center m-2 text-sm lg:text-base">
      {loading ? (
        <Loader text="Fetching All Payments" />
      ) : (
        <table id="allPaymentList" className="md:w-full table table-auto min-w-max">
          <thead>
            <tr className="text-lg font-semibold tracking-wide">
              <th>User Name</th>
              <th>Full Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pays) => (
              pays.payments.map((payment, index) => (
                <tr
                  key={`${pays._id}-${index}`}
                  className={payment.amount >= 10000 ? 'bg-green' : 'bg-white'}
                  style={{ backgroundColor: payment.amount >= 10000 ? 'green' : 'white', textAlign: "center" }}
                >
                  <td>{pays.username}</td>
                  <td>{pays.fullName.firstName} {pays.fullName.middleName} {pays.fullName.lastName}</td>
                  <td>{payment.month}</td>
                  <td>{payment.year}</td>
                  <td>{payment.amount}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
};
export default PaidUsersComponent;
