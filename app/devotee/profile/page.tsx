'use server'

import dynamic from "next/dynamic";
const RenderImage = dynamic(() => import('@/components/common/RenderImage'))
import { decrypt } from "@/lib/auth/auth";
import { cookies } from "next/headers";

const MyProfilePage = () => {
  const cookie = cookies().get("auth")?.value;
  if (!cookie) return;
  const userData = JSON.parse(decrypt(cookie.toString()));

  return (
    <>
      <h1 className="mt-5">My Profile</h1>
      <section className="flex justify-center mt-5">
        <div className="flex flex-col items-center bg-slate-200 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
          <div className="relative w-full md:w-64 h-72">
            <RenderImage css="" users={userData.photo ? userData.photo : ""} />
          </div>
          <div id="body" className="flex flex-col justify-between p-4 leading-normal">
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-stone-600 uppercase block">
              {userData.fullname.firstName} {" "} {userData.fullname.middleName}{" "} {userData.fullname.lastName}
            </h3>
            <h4 className="mb-2 font-normal text-gray-700 ">
              My User_Name:
              <span className="text-black block indent-8">{userData.username}</span>
            </h4>
            <h4 className="mb-2 font-normal text-gray-700 ">
              My Email:
              <span className="text-black block indent-8">
                {userData.email}
              </span>
            </h4>
            <h4 className="mb-2 font-normal text-gray-700">
              Address:
              <div className="text-black uppercase indent-4 italic text-sm">
                <div>{userData.address.flatNumber}/{userData.address.area}</div>
                <div>
                  {userData.address.city}{" "}
                  {userData.address.state}{" "}
                  {userData.address.pinCode}{" "}
                </div>
              </div>
            </h4>
          </div>
        </div>
      </section>
    </>
  );
};
export default MyProfilePage;
