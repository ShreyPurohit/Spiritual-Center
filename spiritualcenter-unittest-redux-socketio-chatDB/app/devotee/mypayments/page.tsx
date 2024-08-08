"use client";

import { myPaymentsApi } from "@/lib/store/features/Payments/fetchPaymentsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
const Loader = dynamic(() => import("@/components/common/Loader"));

const DevoteeMyPaymentsPage = () => {
  const { loading, myPayments, error } = useAppSelector((state) => state.payment);
  const { loggedInUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getMyPayments()
  }, [loggedInUser]);

  const getMyPayments = async () => {
    const resultAction = await dispatch(myPaymentsApi());
    if (myPaymentsApi.fulfilled.match(resultAction)) {
      toast.success("Payments Fetched Successfully")
    }
  }

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
                  className={pays.amount >= 10000 ? 'bg-green' : 'bg-white'}
                  style={{ backgroundColor: pays.amount >= 10000 ? 'green' : 'white', textAlign: "center", }}
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
    </>
  );
};

export default DevoteeMyPaymentsPage;