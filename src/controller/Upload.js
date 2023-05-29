const Minio = require('minio');
require('dotenv').config();
const pool = require('../config/dtabase');
const { uploadprofile } = require('./UserContributor');


// Configurations for minio
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST,
    port: 9001,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

// function for upload to minio
const uploads = (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" })
    }

    const file = req.file;
    const bucketName = process.env.MINIO_BUCKET;
    const objekName = file.originalname;


    minioClient.fPutObject(bucketName, objekName, file.path, (err, etag) => {
        if (err) {
            return console.log(err)
        }
        console.log('File uploaded successfully. eTag: ' + etag)
        console.log(req.file);
        console.log(req.body);

    minioClient.presignedGetObject(bucketName, objekName, function (err, presignedUrl) {
        if (err) {
            return console.log(err)
        }
        console.log('The public URL is', presignedUrl)
        res.json({
            success: 1,
            profile_url: presignedUrl
        })
    })
    })
}

module.exports = uploads;







