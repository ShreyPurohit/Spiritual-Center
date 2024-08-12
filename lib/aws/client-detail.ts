import { S3Client } from "@aws-sdk/client-s3"

const key = process.env.AWS_KEY!
const secret_access_key = process.env.AWS_SECRET_KEY!
const region = process.env.AWS_REGION!

// AWS Client Options

const client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: key,
        secretAccessKey: secret_access_key
    }
})

export default client 