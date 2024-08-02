"use client";

import Link from "next/link";
import { useAppDispatch } from "@/lib/store/hooks";
import { logoutReducer } from "@/lib/store/features/Users/userSlice";

const LogoutComponent = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutReducer());
  };

  return (
    <Link id="donationBtn" href={"/login"} onClick={handleLogout}>
      Logout User
    </Link>
  );
};

export default LogoutComponent;
