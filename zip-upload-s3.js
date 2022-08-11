const fs = require('fs')
var AWS = require("aws-sdk");
const AdmZip = require("adm-zip");
const date = require('date-and-time')

const now  =  new Date();
  
const value = date.format(now,'YYYY-MM-DD');

console.log("current date and time : " + value)

//ENV VARS
const bucketName = "mongo-backup-poc"
const region = "ap-south-1"
const accessKeyId = ""
const secretAccessKey = ""

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
})

function createZipArchive() {
    try {
        const zip = new AdmZip();
        const outputFile = value + ".zip";
        zip.addLocalFolder("./"+value);
        zip.writeZip(outputFile);
        console.log(`Created ${outputFile} successfully`);
    } catch (e) {
        console.log(`Something went wrong. ${e}`);
    }
}

console.log("*** CREATING MONGO DUMP ZIP : START ***")
createZipArchive();
console.log("*** CREATING MONGO DUMP ZIP : END ***")

const fileContent = fs.readFileSync(value+".zip")

const params = {
    Bucket: bucketName,
    Key: value + `.zip`,
    Body: fileContent
}

s3.upload(params, (err, data) => {
    if (err) {
        reject(err)
    }
    else {
        console.log(data)
    }
})