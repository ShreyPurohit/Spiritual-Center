import mongoose, { Schema } from "mongoose";
import { ERole, IUser } from "@/lib/helpers/interfaces";

const EmailRegex = process.env.EMAIL_REGEX as unknown as RegExp

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [3, "For First Name minimum 3 char required"],
      maxlength: [15, "For First Name maximum 15 char allowed"],
      trim: true,
    },
    middleName: {
      type: String,
      required: [true, "Middle Name is required"],
      minlength: [3, "For Middle Name minimum 3 char required"],
      maxlength: [15, "For Middle Name maximum 15 char allowed"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: [3, "For Last Name minimum 3 char required"],
      maxlength: [15, "For Last Name maximum 15 char allowed"],
      trim: true,
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [EmailRegex, "Email Must Be Valid"]
  },
  photo: {
    type: String,
  },
  address: {
    flatNumber: {
      type: Number,
      required: [true, "Flat Number is required"],
      min: [1, "Flat Number Must Contain Atleast 1 Character"]
    },
    area: {
      type: String,
      required: [true, "Area is required"],
      trim: true,
      minlength: [1, "Area Must Contain Atleast 1 Character"]
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      minlength: [1, "City Contain Atleast 1 Character"]
    },
    pinCode: {
      type: String,
      required: [true, "Pin Code is required"],
      minlength: [6, "For Pincode maximum 6 digit allowed"],
      maxlength: [6, "For Pincode maximum 6 digit allowed"],
      match: [/^\d+$/, "Pincode should not contain non digit characters"],
      trim: true,
    },
  },
  initiationDate: {
    type: Date,
    default: Date.now(),
    required: [true, "Initiation Date is required"],
  },
  password: {
    type: String,
    default: "password",
    required: [true, "Password Is Required"],
    minlength: [8, "Password Must Be Atleast 8 Characters Long"],
    maxlength: [20, "Password Must Be Max 20 Characters Long"]
  },
  static_otp: {
    type: String,
    default: "000000",
    minlength: [6, "Static OTP Must Be Exactly 6 Characters Long"],
    maxlength: [6, "Static OTP Must Be Exactly 6 Characters Long"],
    match: [/^\d{6}$/, "Static Otp Must Be a 6-digit Number"]
  },
  role: {
    type: String,
    enum: {
      values: [ERole.admin, ERole.devotee],
      message: `{VALUE} is not supported in role`
    },
    default: ERole.devotee,
    required: true,
  }
},
  { timestamps: true });

const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", userSchema);

export default UserModel;
