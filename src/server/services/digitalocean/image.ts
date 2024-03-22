import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./spaces";

interface UploadParams {
    Body: Buffer;
    Key: string;
}

export const uploadImage = ({ Body, Key }: UploadParams) => {
    const command = new PutObjectCommand({
        Body,
        ACL: "public-read",
        Bucket: "pet-med",
        Key,
    });
    return s3Client.send(command);
};
