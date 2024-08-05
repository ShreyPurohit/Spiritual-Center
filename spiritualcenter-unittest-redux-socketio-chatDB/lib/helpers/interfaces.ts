import { Document, Types } from "mongoose"

export enum ERole {
    admin = 'admin',
    devotee = 'devotee'
}

export interface IUser extends Document {
    _id: string,
    username: string
    fullName: {
        firstName: string,
        middleName: string,
        lastName: string
    },
    photo: string,
    address: {
        flatNumber: number
        area: string
        state: string
        city: string
        pinCode: string
    }
    email: string,
    initiationDate: Date,
    password: string,
    static_otp: string,
    role: ERole,
    groups: [string]
}

export interface IPayment extends Document {
    _id: string,
    made_by: Types.ObjectId,
    month: string,
    year: string,
    amount: number
}

export interface ICompletedPayments {
    _id: string,
    username: string,
    fullName: { firstName: string, middleName: string, lastName: string },
    payments: IPayment[]
}

export interface IUserCreateInput extends Document {
    firstName: string;
    middleName: string;
    lastName: string;
    flatNumber: number;
    area: string;
    state: string;
    city: string;
    pinCode: string;
    email: string;
    initiationDate: string;
    imageUrl: any;
}

export interface ILoginInputs {
    username: string,
    password: string,
    role: string,
    otp: string
}

export interface IFetchUsers {
    _id: string,
    fullName: {
        firstName: string,
        middleName: string,
        lastName: string
    },
    username: string,
    role: string,
    photo: string
}

export interface IChatAreaProps {
    headerData: {
        profilePic: string;
        fullName: string;
    },
    messages: IUserChat[],
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    setShowChatArea: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IChatSideBarProps {
    handleBroadcast: () => void,
    joinRoomHandler: (name: string, username: string, photo: string) => void,
    chatList: IFetchUsers[]
}

export interface IUserChat {
    text: string,
    username: string,
    createdAt: string
}

export interface IGroupSchema {
    roomID: string
    messages: IUserChat[]
}

interface DateData {
    allowedMonths: string[];
    allowedYears: string[];
}

export interface DateClientComponentProps {
    dateData: DateData;
}