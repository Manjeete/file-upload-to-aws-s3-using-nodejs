const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config()

const imageS3 = new AWS.S3({
    accessKeyId: "<AWS_ACCESS_KEY>",
    secretAccessKey: "<AWS_SECRET_KEY>",
    region: "<Region>",
});


//upload banner image
const uploadBannerImage = multer({
    limits : {fileSize:10*1024*1024},
    storage: multerS3({
        s3: imageS3,
        bucket: '<S3_BUCKET_NAME>',
        acl: 'public-read',
        metadata(req, file, cb) {
            cb(null, {
                fieldName: file.fieldname,
            });
        },
        key(req, file, cb) {
            cb(
                null,
                `banner/` +
                    file.fieldname +
                    "-" +
                    Date.now().toString() +
                    "." +
                    file.mimetype.split("/")[1]
            );
        },
    })
})

module.exports = {
    uploadBannerImage
}