"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const Loader = dynamic(() => import("../common/Loader"));
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserCreateInput } from "@/lib/helpers/interfaces";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { validateInitiationDate } from "@/lib/helpers/helperFunctions";
import { addUsers, updateUser } from "@/lib/store/features/Users/fetchUsersApi";
import toast from "react-hot-toast";

interface AdminUserPageProps {
  user?: IUserCreateInput;
}

const AdminUserFormPage: React.FC<AdminUserPageProps> = ({ user }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, loggedInUser } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserCreateInput>({
    mode: "all",
    defaultValues: user || {},
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<IUserCreateInput> = async (data: IUserCreateInput) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("area", data.area);
    formData.append("city", data.city);
    formData.append("pinCode", String(data.pinCode));
    formData.append("flatNumber", String(data.flatNumber));
    formData.append("state", data.state);
    formData.append("email", data.email);
    formData.append("initiationDate", data.initiationDate);
    formData.append("imageUrl", data.imageUrl[0]);
    try {
      if (!user) {
        const resultAction = await dispatch(addUsers(formData));
        if (addUsers.fulfilled.match(resultAction)) {
          toast.success("User Created Successfully")
          router.push(`/admin/userlist`)
        } else {
          throw new Error('Login Failed')
        }
      } else {
        const resultAction = await dispatch(updateUser(formData));
        if (updateUser.fulfilled.match(resultAction)) {
          toast.success("User Updated Successfully")
          router.push(`/admin/userlist`)
        } else {
          throw new Error('Login Failed')
        }
      }
    } catch (error) {

    }
  };

  return (
    <main className="p-2">
      <h1>{user ? "Edit User" : "Create User"}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3 md:p-10 md:h-0"
      >
        {loading ? (
          <Loader text={user ? "Updating User.." : "Creating User.."} />
        ) : (
          <>
            <div>
              <label htmlFor="firstName"> First Name </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: { value: true, message: "First Name is required" },
                  maxLength: {
                    value: 15,
                    message: "For First Name maximum 15 char allowed",
                  },
                  minLength: {
                    value: 3,
                    message: "For First Name minimum 3 char required",
                  },
                })}
                placeholder="First Name"
              />
              {errors.firstName && (
                <span id="firstNameErr"> {errors.firstName.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="middleName"> Middle Name </label>
              <input
                type="text"
                id="middleName"
                placeholder="Middle Name"
                {...register("middleName", {
                  required: { value: true, message: "Middle Name is required" },
                  maxLength: {
                    value: 15,
                    message: "For Middle Name maximum 15 char allowed",
                  },
                  minLength: {
                    value: 3,
                    message: "For Middle Name minimum 3 char required",
                  },
                })}
              />
              {errors.middleName && (
                <span id="middleNameErr"> {errors.middleName.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="lastName"> Last Name </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                {...register("lastName", {
                  required: { value: true, message: "Last Name is required" },
                  maxLength: {
                    value: 15,
                    message: "For Last Name maximum 15 char allowed",
                  },
                  minLength: {
                    value: 3,
                    message: "For Last Name minimum 3 char required",
                  },
                })}
              />
              {errors.lastName && (
                <span id="lastNameErr"> {errors.lastName.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="emailId"> Email </label>
              <input
                type="text"
                id="emailId"
                placeholder="Email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Pleae enter valid email",
                  },
                })}
              />
              {errors.email && (
                <span id="emailIdErr"> {errors.email.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="initiationDate"> Initiation Date </label>
              <input
                type="date"
                id="initiationDate"
                {...register("initiationDate", {
                  required: {
                    value: true,
                    message: "Initiation Date is required",
                  },
                  validate: validateInitiationDate,
                })}
              />
              {errors.initiationDate && (
                <span id="initiationDateErr">
                  {" "}
                  {errors.initiationDate.message}{" "}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="flatNumber"> Flat Number </label>
              <input
                type="number"
                id="flatNumber"
                placeholder="Flat Number"
                {...register("flatNumber", {
                  required: { value: true, message: "Flat Number is required" },
                })}
              />
              {errors.flatNumber && (
                <span id="flatNumberErr"> {errors.flatNumber.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="area"> Area </label>
              <input
                type="text"
                id="area"
                placeholder="Area"
                {...register("area", {
                  required: { value: true, message: "Area is required" },
                })}
              />
              {errors.area && <span id="areaErr"> {errors.area.message} </span>}
            </div>
            <div>
              <label htmlFor="city"> City </label>
              <input
                type="text"
                id="city"
                placeholder="City"
                {...register("city", {
                  required: { value: true, message: "City is required" },
                })}
              />
              {errors.city && <span id="cityErr"> {errors.city.message} </span>}
            </div>
            <div>
              <label htmlFor="state"> State </label>
              <input
                type="text"
                id="state"
                placeholder="State"
                {...register("state", {
                  required: { value: true, message: "State is required" },
                })}
              />
              {errors.state && (
                <span id="stateErr"> {errors.state.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="pinCode"> Pincode </label>
              <input
                type="text"
                id="pinCode"
                placeholder="Pin Code"
                {...register("pinCode", {
                  required: { value: true, message: "Pincode is required" },
                  minLength: {
                    value: 6,
                    message: "For Pincode maximum 6 digit allowed",
                  },
                  maxLength: {
                    value: 6,
                    message: "For Pincode maximum 6 digit allowed",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Pincode should not contain non digit characters",
                  },
                })}
              />
              {errors.pinCode && (
                <span id="pinCodeErr"> {errors.pinCode.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="imageUrl"> Photo </label>
              <input
                type="file"
                id="imageUrl"
                {...register("imageUrl")}
                className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-stone-700 hover:file:bg-violet-100"
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3 ">
              <button
                type="submit"
                id="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 w-full rounded focus:outline-none focus:shadow-outline"
              >
                {user ? "Update User" : "Create User"}
              </button>
            </div>
          </>
        )}
      </form>
      {error && (
        <h2 className="text-center text-2xl text-amber-700 tracking-wide uppercase">
          {error}
        </h2>
      )}
    </main>
  );
};

export default AdminUserFormPage;
