"use client";

import { fetchUnpaidUsersApi } from "@/lib/store/features/Users/fetchUsersApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Loader = dynamic(() => import("../common/Loader"));

const UnpaidUserComponent = () => {
  const dispatch = useAppDispatch();
  const { unpaidusers, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUnpaidUsersApi());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto text-center m-2 text-sm lg:text-base">
      {loading ? (
        <Loader text="Fetching Unpaid Users" />
      ) : (
        <table
          id="allUnpaidList"
          className="md:w-full table table-auto min-w-max"
        >
          <thead>
            <tr className="text-lg font-semibold tracking-wide">
              <td>User Name</td>
              <td>Full Name</td>
              <td>Email</td>
              <td>Address</td>
            </tr>
          </thead>
          <tbody>
            {unpaidusers.map((pays, index) => (
              <tr key={pays._id} className="bg-red-200">
                <td>{pays.username}</td>
                <td>
                  {pays.fullName.firstName} {pays.fullName.lastName}
                </td>
                <td>{pays.email}</td>
                <td>
                  {pays.address.flatNumber} {pays.address.area}{" "}
                  {pays.address.city} {pays.address.state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default UnpaidUserComponent;
