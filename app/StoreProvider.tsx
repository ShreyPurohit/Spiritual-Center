"use client";

import { alreadyLoggedIn } from "@/lib/store/features/Users/fetchUsersApi";
import { AppStore, centralStore } from "@/lib/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = centralStore();
    // Add Initial Load Data Here
    storeRef.current.dispatch(alreadyLoggedIn());
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
