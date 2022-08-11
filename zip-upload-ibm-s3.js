const fs = require('fs')
var ibm = require('ibm-cos-sdk');
var util = require('util');
const AdmZip = require("adm-zip");
const date = require('date-and-time')

const now  =  new Date();
const value = date.format(now,'YYYY-MM-DD');
console.log("current date and time : " + value)

//ENV VARS
var config = {
    endpoint: '',
    apiKeyId: '',
    serviceInstanceId: 'cloud-object-storage',
};

var cos = new ibm.S3(config);

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

function doCreateObject() {
    console.log('Creating object');
    return cos.putObject({
        Bucket: 'data-backup-poc-s3',
        Key: value + '.zip',
        Body: fileContent
    }).promise();
}

doCreateObject();