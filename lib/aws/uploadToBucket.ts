import { PutObjectCommand } from "@aws-sdk/client-s3";
import client from "./client-detail";

const bucketName: string = process.env.AWS_S3_BUCKET_NAME!

// AWS Upload Bucket Options

export const uploadToBucket = async (fileName: string, body: Buffer) => {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `${fileName}`,
        Body: body,
        ContentType: "image/png"
    })
    try {
        const response = await client.send(command);
        console.log("New User Uploaded To AWS Successfully as ", fileName);
    } catch (error) {
        console.log("Error In Uploading To AWS", error)
    }
}

export default uploadToBucket