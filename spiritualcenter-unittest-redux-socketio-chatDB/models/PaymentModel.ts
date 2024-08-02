import mongoose, { Schema } from "mongoose";
import { IPayment } from "@/lib/helpers/interfaces";

const PaymentSchema: Schema = new Schema<IPayment>({
  made_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  month: {
    type: String,
    required: [true, "Month is required"],
  },
  year: {
    type: String,
    required: [true, "Year is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [100, "Amount should not be less than 100"],
  },
});

const PaymentModel = (mongoose.models.Payment as mongoose.Model<IPayment>) || mongoose.model<IPayment>("Payment", PaymentSchema);

export default PaymentModel;
