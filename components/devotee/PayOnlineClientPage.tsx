"use client";

import { IPayment, DateClientComponentProps } from "@/lib/helpers/interfaces";
import { makePayment } from "@/lib/store/features/Payments/fetchPaymentsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const DevoteePayOnlinePage: React.FC<DateClientComponentProps> = ({ dateData }) => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.payment);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IPayment>({ mode: "all" });

    const onSubmit: SubmitHandler<IPayment> = async (data) => {
        const formData = new FormData();
        formData.append("month", data.month);
        formData.append("year", data.year);
        formData.append("amount", String(data.amount));
        try {
            const resultAction = await dispatch(makePayment(formData))
            if (makePayment.fulfilled.match(resultAction)) {
                toast.success("Payment Made Successfully")
                reset()
                router.push(`/devotee/mypayments`)
            }
        } catch (error: any) {
            toast.error(error)
        }
    };

    const validateAmount = (value: string) => {
        if (Number(value) < 100) {
            return "Amount should not be less than 100";
        }
        return true;
    };

    return (
        <main className="p-2">
            <h1>Make Donation</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:w-1/2 m-auto p-5 gap-5 md:mt-5 sm:border border-black" >
                <div>
                    <label htmlFor="month"> Month </label>
                    <select
                        id="month"
                        {...register("month", {
                            required: { value: true, message: "Month is required" },
                        })}
                        className="w-full py-1 px-2 border border-slate-300"
                    >
                        {["", ...dateData.allowedMonths].map((month) => (
                            <option key={month} defaultValue={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    {errors.month && <span id="monthErr"> {errors.month.message} </span>}
                </div>
                <div>
                    <label htmlFor="year"> Year </label>
                    <select
                        id="year"
                        {...register("year", {
                            required: { value: true, message: "Year is required" },
                        })}
                        className="w-full py-1 px-2 border border-slate-300"
                    >
                        {["", ...dateData.allowedYears].map((year) => (
                            <option key={year} defaultValue={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.year && <span id="yearErr"> {errors.year.message} </span>}
                </div>
                <div>
                    <label htmlFor="amount">Amount </label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Amount"
                        {...register("amount", {
                            required: { value: true, message: "Amount is required" },
                            validate: validateAmount,
                        })}
                    />
                    {errors.amount && (
                        <span id="amountErr"> {errors.amount.message} </span>
                    )}
                </div>
                <button
                    id="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-slate-400 hover:bg-slate-600 hover:text-white rounded-lg"
                >
                    {loading ? "Please Wait..." : "Make Donation"}
                </button>
            </form>
            {error && <h2>{error}</h2>}
        </main>
    );
};
export default DevoteePayOnlinePage;
