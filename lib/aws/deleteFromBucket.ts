import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import client from "./client-detail";

const bucketName: string = process.env.AWS_S3_BUCKET_NAME!

// AWS Delete From Bucket Options

const deleteProfileFormAWS = async (fileName: string) => {
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileName
    })
    try {
        await client.send(command)
        console.log("Removed Image Form Cloud Successfully", fileName);
    } catch (error) {
        console.error(error);
    }
}

export default deleteProfileFormAWS