"use client";

import { classSwitch } from "@/lib/helpers/helperFunctions";
import { myPaymentsApi } from "@/lib/store/features/Payments/fetchPaymentsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Loader = dynamic(() => import("@/components/common/Loader"));

const DevoteeMyPaymentsPage = () => {
  const { error, loading, myPayments } = useAppSelector((state) => state.payment);
  const { loggedInUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(myPaymentsApi());
    }, 1000);
    return () => {
      clearTimeout(id)
    }
  }, []);

  return (
    <>
      <h1>My Payments</h1>
      {loading ? <Loader text="Fetching My Payments" /> :
        <div className="overflow-x-auto text-center m-2 text-sm lg:text-base">
          <table className="w-full table table-auto min-w-max">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Month</th>
                <th>Year</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.map((pays, index) => (
                <tr
                  id={`payment-${index}`}
                  key={pays._id}
                  className={classSwitch(pays.amount)?.classname}
                  style={{
                    backgroundColor: classSwitch(pays.amount)?.style,
                    textAlign: "center",
                  }}
                >
                  <td>{loggedInUser?.split("-").slice(2).join("-")}</td>
                  <td>{pays.month}</td>
                  <td>{pays.year}</td>
                  <td>{pays.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      {error && (
        <h2 id="authInfo" className="text-center text-2xl text-amber-700 tracking-wide uppercase">
          {error === 'Error' ? "" : error}
        </h2>
      )}
    </>
  );
};
export default DevoteeMyPaymentsPage;