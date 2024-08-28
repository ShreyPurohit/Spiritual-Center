"use client";

import UserListComponent from "@/components/admin/UserListComponent";
import { IUser } from "@/lib/helpers/interfaces";
import { fetchAllUsers } from "@/lib/store/features/Users/fetchUsersApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Loader = dynamic(() => import('@/components/common/Loader'), { ssr: false });
const UserSearchSortButtons = dynamic(() => import('@/components/admin/UserSearchAndSortButton'), { ssr: false });
const UserListPaginationButtons = dynamic(() => import('@/components/admin/UserListPaginationButtons'), { ssr: false });

const AdminUserListPage = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  const { user, loading, error, totalPages, currentPage } = useAppSelector((state) => state.user);

  useEffect(() => {
    setUsers(user);
  }, [user]);

  useEffect(() => {
    fetchUsersCall();
  }, [currentPage]);

  const fetchUsersCall = useCallback(async () => {
    const resultAction = await dispatch(fetchAllUsers({ page: currentPage, limit: 4 }));
    if (fetchAllUsers.fulfilled.match(resultAction)) {
      toast.success("Users Fetched Successfully");
    }
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback((newPage: number) => {
    dispatch(fetchAllUsers({ page: newPage, limit: 4 }));
  }, [dispatch]);

  if (loading || !users) return <Loader text="Fetching Users" />;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <h1>User List</h1>
      <UserSearchSortButtons
        users={users}
        setUsers={setUsers}
        allUsers={user}
      />
      <UserListComponent users={users} />
      <UserListPaginationButtons
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </>
  );
};

export default AdminUserListPage;