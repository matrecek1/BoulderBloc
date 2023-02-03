import AWS from "aws-sdk"
require('dotenv').config('../.env');

(async function(){
    try {
        AWS.config.setPromisesDependency(Promise)
        AWS.config.update({
           accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
           secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
           region: 'eu-central-1'
        })
        const s3 = new AWS.S3()
        const response = await s3.listObjectsV2({
            Bucket: 'boulderblocapi'
        }).promise()
        console.log(response);
    } catch (e) {
        console.log("error: ",e);
    }
})()