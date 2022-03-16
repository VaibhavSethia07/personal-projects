const express = require("express");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require("./s3");
const { S3 } = require("aws-sdk");
const unlinkFile = util.promisify(fs.unlink);
const app = express();

app.use(express.static("./public"));

app.get("/images/:key", (req, res) => {
  const key = req.params.key;
  if (!key) return new Error("Image key doesn't exist");
  /*  The image exists with the key as the name and we need to grab the image and render it on the browser. For this we
    use the getFileStream() of s3.js */
  const readStream = getFileStream(key);

  /*  The great thing about the read stream is that we can pipe it to the `res`*/
  readStream.pipe(res);
  /*  To check if this is working we make an image tag in the index.html and show the file uploaded*/
});

app.post("/uploadImage", upload.single("myImage"), async (req, res, next) => {
  /*  We can directly store the file in S3, without storing it in server. But doing provides us the time to have some middle
    logic, like only the authorised users should upload the file. To send the file straight to S3 `multer-s3` package
*/

  // The info about the uploaded is stored in `req.file` and the form content is in `req.body`
  try {
    const file = req.file;
    if (!file) return new Error("Image not provided");
    // Upload the file
    const result = await uploadFile(file);
    console.log(result);
    /* 
    {
        ETag: '"d88bdf385815ba5fceb89cae060228f4"',
        Location: 'https://talawa-api-events.s3.amazonaws.com/ed668bcb35d99ebebe7655e07b2ea0eb',
        key: 'ed668bcb35d99ebebe7655e07b2ea0eb',
        Key: 'ed668bcb35d99ebebe7655e07b2ea0eb',
        Bucket: 'talawa-api-events'
    }
      */
    // res.send("It's working!");
    /*  Returning the link of file. We can put the below URL into the image tag and it will show the image.
        To get the images we make the get endpoint as well
    */

    /*  Once the upload is complete we delete the file from `upload` folder of S3. This is done using `unlinkFile()` from
        `util` module
    */
    await unlinkFile(file.path);
    return res.send({ imagePath: `/images/${result.Key}` });
  } catch (err) {
    throw err;
  }
});

/*  Before sending the file to S3 bucket, we need to use AWS account. Go to S3 section, proivide unique bucket name. Now,
    we need to store the bucket name and region in .env file. Also install dotenv package and use it using `require`
    module where you want to access the env variables
    
    Since the bucket is private, only we can access the bucket
    using our account. We want our application to access the bucket so we create a policy in IAM. */

/*  Create a policy that allows to read, add and delete a file.
    Select Service: S3
    Read: Get Object
    Write: Put Object, Delete Object

    In the resources section we specify the name of individual bucket for which the role to be applied. Add ARN
    Specify the bucket name and tick any for object name.

    If the resources not mentioned, the role will be applied to any bucket. The do next and in Review Policy provide bucket
    policy Eg: <bucketname>-policy

    Next we need to apply this policy to a user. In our case the user is our application
    Go to Users section in IAM, provide application name and give it programmatic access and attach the existing policy that
    we just created.

    Take the Access Key and Secret Key and paste in .env file. Don't show these keys.

    Now we need to write the JavaScript code to upload the file. For this we install the package aws-sdk
    npm i aws-sdk
    We are going to use the S3 section of aws-sdk. We create separate file `s3.js` 
*/

app.listen(3000, () => {
  console.log("🚀 Server listening at port 3000...");
});
