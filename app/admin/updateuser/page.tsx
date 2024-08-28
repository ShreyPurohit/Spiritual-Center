"use client";

import dynamic from "next/dynamic";
const AdminUserFormPage = dynamic(() => import('@/components/admin/UserForm'), { ssr: false })
import { useAppSelector } from "@/lib/store/hooks";

const AdminUpdateUserPage = () => {
  const { editUser } = useAppSelector((state) => state.user);
  if (!editUser) { return }

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
    initiationDate: new Date(editUser.initiationDate).toISOString().split("T")[0],
    imageUrl: editUser.photo,
  };
  return <AdminUserFormPage user={inputProp} />;
};

export default AdminUpdateUserPage;
