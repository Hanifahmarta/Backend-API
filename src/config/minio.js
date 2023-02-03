var Minio = require ('minio')


// credensial minio
var minioClient = new Minio.Client({
    endPoint: '172.20.0.84',
    port: 9000,
    useSSL: false,
    accessKey: 'xjUQ3DwRN4LepbaH',
    secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc'
});


// Melihat list bucket bisa
// minioClient.listBuckets(function(err, buckets) {
//     if (err) return console.log(err)
//     console.log('buckets :', buckets)
//   });


// Create bucket tobe public
// minioClient.setBucketPolicy('testing', 'public-read', function(err) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('Bucket mybucket is now public')
//   })


// Get link URL public from file in bucket (done)
// Get Link URL public from file in bucket dgn waktu kedaluwarsa dari URL yang dikembalikan, dalam detik.
//   minioClient.presignedUrl('GET', 'testing', 'kitten.png', 60 * 60 * 24, function(err, url) {
// // 60*60*24 = 1 hari => Itu akan mencetak URL public dari file 'myfile.jpg' di bucket 'mybucket' yang akan kadaluwarsa dalam 24 jam.
//     if (err) {
//       return console.log(err)
//     }
//     console.log(url)
//   })

// Upload file to bucket (done)
//   minioClient.fPutObject('testing2', 'kitten.png', 'E:/Capstone Server/kitten.png', function(err, etag) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('File uploaded successfully. eTag: ' + etag)
//   })

minioClient.fPutObject('testing2', 'american-sign-language_1.tar.gz', 'E:/Capstone Server/american-sign-language_1.tar.gz', function(err, etag) {
    if (err) {
      return console.log(err)
    }
    console.log('File uploaded successfully. eTag: ' + etag)
  })






