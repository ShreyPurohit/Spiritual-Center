"use client";

import loginSvg from "@/images/logo.svg";
import { ILoginInputs } from "@/lib/helpers/interfaces";
import { loginUser } from "@/lib/store/features/Users/fetchUsersApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
const Loader = dynamic(() => import("@/components/common/Loader"));

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showOtp, setShowOtp] = useState(false);
  const { loading, error, loggedInUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (loggedInUser) {
      router.push(`/${loggedInUser.split("-")[1]}`);
    } else {
      return;
    }
  }, [loggedInUser, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginInputs>({ mode: "all" });

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "devotee") {
      setShowOtp(true);
    } else {
      setShowOtp(false);
    }
  };

  const onSubmit: SubmitHandler<ILoginInputs> = (data: ILoginInputs) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("otp", data.otp);
    dispatch(loginUser(formData));
    if (error && error !== 'Rejected') {
      toast.error(error);
    } else {
      toast.success("Logged In Successfully");
      reset();
    }
    router.push(`/${data.role}`)
  };

  return (
    <main className="md:w-3/4 m-auto md:h-0">
      <span className="flex justify-center items-center">
        <div className="flex justify-center">
          <Image
            src={loginSvg}
            alt="company-logo"
            className="animate-float w-44 h-44 md:w-60 md:h-60"
          />
        </div>
      </span>
      <h1>LOGIN USER</h1>
      <form
        onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:w-1/2 m-auto p-5 gap-5 md:mt-5 md:border border-black drop-shadow-md" >
        {loading ? (<Loader text={"Logging In..."} />) : (
          <>
            <div>
              <label htmlFor="username">Username </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                })}
              />
              {errors.username && (
                <span id="usernameErr"> {errors.username.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="password">Password </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
              />
              {errors.password && (
                <span id="passwordErr"> {errors.password.message} </span>
              )}
            </div>
            <div>
              <label htmlFor="role">Role </label>
              <select
                id="role"
                className="w-full py-1 px-2 border border-slate-300"
                {...register("role", {
                  required: { value: true, message: "Role is required" },
                })}
                onChange={handleRoleChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="devotee">Devotee</option>
              </select>
              {errors.role && <span id="roleErr"> {errors.role.message} </span>}
            </div>
            {showOtp ? (
              <div>
                <label htmlFor="otp">Otp </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Otp"
                  {...register("otp", {
                    required: { value: true, message: "Otp is required" },
                  })}
                />
                {errors.otp && <span id="otpErr"> {errors.otp.message} </span>}
              </div>
            ) : (
              <></>
            )}
            <button
              id="submit"
              disabled={loading}
              className="px-4 py-2 bg-slate-400 hover:bg-slate-600 disabled:hover:bg-slate-400 hover:transition hover:text-white rounded-lg"
            >
              Submit Credential
            </button>
          </>
        )}
      </form>
      {error && (
        <h2
          id="authInfo"
          className="text-center text-2xl text-amber-700 tracking-wide uppercase"
        >
          {error === 'Rejected' ? "" : error}
        </h2>
      )}
    </main>
  );
};

export default LoginPage;
