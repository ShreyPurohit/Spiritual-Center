"use client";

import EditDeleteButtons from "@/components/admin/UserEditDeleteButtons";
import UserListPaginationButtons from "@/components/admin/UserListPaginationButtons";
import UserSearchSortButtons from "@/components/admin/UserSearchAndSortButton";
import Loader from "@/components/common/Loader";
import RenderImage from "@/components/common/RenderImage";
import { getdate } from "@/lib/helpers/helperFunctions";
import { IUser } from "@/lib/helpers/interfaces";
import { fetchAllUsers } from "@/lib/store/features/Users/fetchUsersApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminUserListPage = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const { user, loading, error, totalPages, currentPage } = useAppSelector((state) => state.user);

  useEffect(() => {
    setUsers(user);
    setAllUsers(user);
  }, [user])

  useEffect(() => {
    fetchUsersCall()
  }, [dispatch, currentPage]);

  if (!users) {
    return <h1>Loading....</h1>
  }

  const fetchUsersCall = async () => {
    const resultAction = await dispatch(fetchAllUsers({ page: currentPage, limit: 4 }));
    if (fetchAllUsers.fulfilled.match(resultAction)) {
      return toast.success("Users Fetched Successfully")
    }
  }

  const handlePageChange = (newPage: number) => {
    const resultAction = dispatch(fetchAllUsers({ page: newPage, limit: 4 }));
    if (fetchAllUsers.fulfilled.match(resultAction)) {
      return toast.success("Users Fetched Successfully")
    }
    setAllUsers(user);
  };

  return (
    <>
      <h1>User List</h1>
      {error && <h1>{error}</h1>}
      <UserSearchSortButtons
        users={users}
        setUsers={setUsers}
        allUsers={allUsers}
      />
      {loading ? <Loader text="Fetching Users" /> :
        <>
          <div className="overflow-x-auto text-center m-2 text-sm lg:text-base">
            <table id="devoteeList" className="md:w-full table table-auto min-w-max">
              <thead>
                <tr>
                  <th>DevoteeId</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>EmailId</th>
                  <th>Flat No</th>
                  <th>Area</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Initiation Date</th>
                  <th>Photo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 && users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-200 hover:transition" >
                    <td>{user.username}</td>
                    <td>{user.fullName.firstName}</td>
                    <td>{user.fullName.middleName}</td>
                    <td>{user.fullName.lastName}</td>
                    <td>
                      <div className="flex flex-col">
                        <div>{user.email.split('@')[0]}</div>
                        <div>@{user.email.split('@')[1]}</div>
                      </div>
                    </td>
                    <td>{user.address.flatNumber}</td>
                    <td>
                    <div className="flex flex-col">
                        <div>{user.address.area.split(' ')[0]}</div>
                        <div>{user.address.area.split(' ')[1]}</div>
                      </div>
                    </td>
                    <td>{user.address.city}</td>
                    <td>{user.address.state}</td>
                    <td>{user.address.pinCode}</td>
                    <td>{getdate(user.initiationDate)}</td>
                    <td>
                      <div className="relative h-20">
                        <RenderImage css="w-14 md:w-20" users={user.photo} />
                      </div>
                    </td>
                    <EditDeleteButtons users={user} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UserListPaginationButtons
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      }
    </>
  );
};

export default AdminUserListPage;
