const Minio = require('minio');
require('dotenv').config();


const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_HOST,   
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});
module.exports = minioClient;

// Check connection to minio
minioClient.bucketExists('testing', function(err, exists) {
    if (err) {
        return console.log(err)
    }
    if (exists) {
        console.log('Bucket exists.')
    } else {
        console.log('Bucket does not exist.')
    }
})

 minioClient.presignedGetObject('testing', 'kitten.png', 24 * 60 * 60, function(err, presignedUrl) {
    if (err) {
      return console.log(err)
    }
    console.log('The public URL is', presignedUrl)
  })
