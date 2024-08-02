"use client";

import AdminUserFormPage from "@/components/admin/UserForm";
import { IUserCreateInput } from "@/lib/helpers/interfaces";
import { useAppSelector } from "@/lib/store/hooks";

const AdminUpdateUserPage = () => {
  const { editUser } = useAppSelector((state) => state.user);
  if (!editUser) {
    return;
  }
  const renderDate = new Date(editUser.initiationDate)
    .toISOString()
    .split("T")[0];

  const inputProp: any = {
    firstName: editUser.fullName.firstName,
    middleName: editUser.fullName.middleName,
    lastName: editUser.fullName.lastName,
    flatNumber: editUser.address.flatNumber,
    area: editUser.address.area,
    state: editUser.address.state,
    city: editUser.address.city,
    pinCode: editUser.address.pinCode,
    email: editUser.email,
    initiationDate: renderDate,
    imageUrl: editUser.photo,
  };
  return <AdminUserFormPage user={inputProp} />;
};

export default AdminUpdateUserPage;
