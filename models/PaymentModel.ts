import mongoose, { Schema } from "mongoose";
import { IPayment } from "@/lib/helpers/interfaces";

const PaymentSchema: Schema<IPayment> = new Schema<IPayment>({
  made_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Made By (User) is required"]
  },
  month: {
    type: String,
    required: [true, "Month is required"],
    enum: {
      values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      message: `{VALUE} is not supported in month`
    }
  },
  year: {
    type: String,
    required: [true, "Year is required"],
    match: [/^\d{4}$/, "Year Must Be 4-digit Long"]
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [100, "Amount should not be less than 100"],
  },
}, { timestamps: true });

const PaymentModel = (mongoose.models.Payment as mongoose.Model<IPayment>) || mongoose.model<IPayment>("Payment", PaymentSchema);

export default PaymentModel;
