"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import { IUserCreateInput } from "@/lib/helpers/interfaces";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { validateInitiationDate } from "@/lib/helpers/helperFunctions";
import { addUsers, updateUser } from "@/lib/store/features/Users/fetchUsersApi";

const Loader = dynamic(() => import("../common/Loader"));

interface AdminUserPageProps {
    user?: Partial<IUserCreateInput>;
}

const AdminUserFormPage: React.FC<AdminUserPageProps> = ({ user }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.user);

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

        const toastID = toast.loading("Processing...");

        try {
            let resultAction;
            if (!user) {
                resultAction = await dispatch(addUsers(formData));
                if (addUsers.fulfilled.match(resultAction)) {
                    toast.success("User Created Successfully", { id: toastID });
                    router.push(`/admin/userlist`);
                }
            } else {
                resultAction = await dispatch(updateUser(formData));
                if (updateUser.fulfilled.match(resultAction)) {
                    toast.success("User Updated Successfully", { id: toastID });
                    router.push(`/admin/userlist`);
                }
            }

            if (!resultAction || resultAction.meta.requestStatus === "rejected") {
                throw new Error(resultAction.payload || "Something went wrong");
            }
        } catch (err: any) {
            toast.error(err.message || "Error processing request", { id: toastID });
        }
    };

    return (
        <main className="p-2">
            <h1>{user ? "Edit User" : "Create User"}</h1>
            {loading ? (<Loader text="Loading..." />) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 p-2"
                >
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            {...register("firstName", {
                                required: "First Name is required",
                                maxLength: {
                                    value: 15,
                                    message: "Maximum 15 characters allowed",
                                },
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters required",
                                },
                            })}
                        />
                        {errors.firstName && <span>{errors.firstName.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="middleName">Middle Name</label>
                        <input
                            type="text"
                            id="middleName"
                            placeholder="Middle Name"
                            {...register("middleName", {
                                required: "Middle Name is required",
                                maxLength: {
                                    value: 15,
                                    message: "Maximum 15 characters allowed",
                                },
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters required",
                                },
                            })}
                        />
                        {errors.middleName && <span>{errors.middleName.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            {...register("lastName", {
                                required: "Last Name is required",
                                maxLength: {
                                    value: 15,
                                    message: "Maximum 15 characters allowed",
                                },
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters required",
                                },
                            })}
                        />
                        {errors.lastName && <span>{errors.lastName.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Please enter a valid email",
                                },
                            })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="initiationDate">Initiation Date</label>
                        <input
                            type="date"
                            id="initiationDate"
                            {...register("initiationDate", {
                                required: "Initiation Date is required",
                                validate: validateInitiationDate,
                            })}
                        />
                        {errors.initiationDate && <span>{errors.initiationDate.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="flatNumber">Flat Number</label>
                        <input
                            type="number"
                            id="flatNumber"
                            placeholder="Flat Number"
                            {...register("flatNumber", {
                                required: "Flat Number is required",
                            })}
                        />
                        {errors.flatNumber && <span>{errors.flatNumber.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="area">Area</label>
                        <input
                            type="text"
                            id="area"
                            placeholder="Area"
                            {...register("area", {
                                required: "Area is required",
                            })}
                        />
                        {errors.area && <span>{errors.area.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            placeholder="City"
                            {...register("city", {
                                required: "City is required",
                            })}
                        />
                        {errors.city && <span>{errors.city.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            placeholder="State"
                            {...register("state", {
                                required: "State is required",
                            })}
                        />
                        {errors.state && <span>{errors.state.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="pinCode">Pincode</label>
                        <input
                            type="text"
                            id="pinCode"
                            placeholder="Pin Code"
                            {...register("pinCode", {
                                required: "Pincode is required",
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: "Please enter a valid 6-digit pincode",
                                },
                            })}
                        />
                        {errors.pinCode && <span>{errors.pinCode.message}</span>}
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
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        <button
                            type="submit"
                            id="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 w-full rounded focus:outline-none focus:shadow-outline"
                        >
                            {user ? "Update User" : "Create User"}
                        </button>
                    </div>
                </form>
            )}
            {error && (
                <div className="text-center mt-4">
                    <h2 className="text-2xl text-amber-700 tracking-wide uppercase">
                        {error}
                    </h2>
                </div>
            )}
        </main >
    )
}

export default AdminUserFormPage
