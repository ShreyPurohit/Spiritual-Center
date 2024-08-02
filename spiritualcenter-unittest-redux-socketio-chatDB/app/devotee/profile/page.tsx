import RenderImage from "@/components/common/RenderImage";
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
        <div className="flex flex-col items-center bg-slate-200 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:shadow-none">
          <RenderImage
            css="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            users={userData.photo ? userData.photo : ""}
          />
          <div
            id="body"
            className="flex flex-col justify-between p-4 leading-normal"
          >
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-stone-600 uppercase ">
              {userData.fullname.firstName} {userData.fullname.middleName}{" "}
              {userData.fullname.lastName}
            </h3>
            <h4 className="mb-2 font-normal text-gray-700 ">
              My User_Name:{" "}
              <span className="text-black">{userData.username}</span>
            </h4>
            <h4 className="mb-2 font-normal text-gray-700 ">
              My Email:
              <span className="text-black tracking-tighter sm:tracking-normal">
                {" "}
                {userData.email}
              </span>
            </h4>
            <h4 className="mb-2 font-normal text-gray-700">
              Address:{" "}
              <span className="text-black not-italic tracking-tighter sm:tracking-normal">
                {userData.address.flatNumber}/{userData.address.area}{" "}
                {userData.address.city} {userData.address.state}
              </span>
            </h4>
          </div>
        </div>
      </section>
    </>
  );
};
export default MyProfilePage;
