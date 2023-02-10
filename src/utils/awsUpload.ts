import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({path: '../../.env'})



const accesKey = process.env.AWS_S3_ACCESS_KEY_ID
const secretKey = process.env.AWS_S3_SECRET_ACCESS_KEY
const bucketName =  process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION

const s3 = new S3Client({
    credentials:{
        accessKeyId: accesKey as string,
        secretAccessKey: secretKey as string
    },
    region:bucketRegion
}) 
export const getImageFromAws = async(key:string) =>{
    const params = {
        Bucket:bucketName,
        Key: key
    }
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url
}
export interface IAWSPutParams {
    fileName: string;
    buffer:any;
    mimetype:any
}
export const putImageToAWS = async(params:IAWSPutParams) =>{
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: params.fileName,
        Body: params.buffer,
        ContentType: params.mimetype
    })
    await s3.send(command)
}

export const deleteImageFromAWS = async(key:string) =>{
    const params = {
        Bucket: bucketName,
        Key: key
    }
    const command = new DeleteObjectCommand(params)
    await s3.send(command)
}

// export const deleteFromAWS = async (key:string)



