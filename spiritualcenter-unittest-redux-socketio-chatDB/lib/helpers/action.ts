'use server'

import UserModel from "@/models/UserModel";
import connectMongoDb from "../connectDatabase";

export const getUserNames = async (name: string) => {
    try {
        await connectMongoDb()
        const userNames = await UserModel.aggregate([
            { $match: { "fullName.firstName": { $regex: name, $options: "i", }, }, },
            { $project: { fullName: 1, }, },
        ])

        return JSON.stringify({userNames});
    } catch (error) {
        console.error(error);
    }
};

export const getSingleUserData = async (name: string) => {
    try {
        await connectMongoDb()
        const SingleUserData = await UserModel.aggregate([
            {
                $match: {
                    "fullName.firstName": {
                        $regex: name,
                        $options: "i"
                    }
                }
            }, {
                $project: {
                    username: 1,
                    fullName: 1,
                    email: 1,
                    photo: 1,
                    address: 1,
                    initiationDate: 1
                }
            }
        ])
        if (!SingleUserData) {
            throw new Error("User Not Found")
        }
        return JSON.stringify(SingleUserData)
    } catch (error) {
        console.error(error);
    }
}