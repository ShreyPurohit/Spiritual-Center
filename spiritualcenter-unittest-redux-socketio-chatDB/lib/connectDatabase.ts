import mongoose from "mongoose";

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log("Connected To MongoDb");
    } catch (error) {
        console.error(error)
    }
}

export default connectMongoDb