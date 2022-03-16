const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const dotenv = require("dotenv");

dotenv.config();

// We create a new instance of S3. It takes an object where we specify all the credentials of S3 Bucket
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  bucketRegion,
  accessKeyId,
  secretAccessKey,
});

// Upload a file to S3
const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadObject = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadObject).promise();
};

// Download a file from S3
/* To get the files back we are going to use the `Key` property that we set in the `uploadFile()` */
const getFileStream = (fileKey) => {
  // We are using the file key to make an object
  const downloadObject = {
    Bucket: bucketName,
    Key: fileKey,
  };
  // We then ask the s3 to give the file and we want it to be readStream.
  return s3.getObject(downloadObject).createReadStream();
};

module.exports = { uploadFile, getFileStream };
