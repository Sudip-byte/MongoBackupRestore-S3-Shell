const express = require('express')
const multer = require('multer')
const fs = require('fs')
var AWS = require("aws-sdk");
const app = express()
const upload = multer({ dest: "script.js" })
const AdmZip = require("adm-zip");

//ENV VARS
const bucketName = "mongo-backup-poc"
const region = "ap-south-1"
const accessKeyId = "AKIASTPBLAE2BEKFC5EA"
const secretAccessKey = "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"

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
})

spawn = require('child_process').spawn
let backupProcess = spawn('mongodump', [
    '--forceTableScan',
    '--host=localhost',
    '--port=27017',
    '--out=backup/'
    ]);

backupProcess.on('exit', (code, signal) => {
    if(code) 
        console.log('Backup process exited with code ', code);
    else if (signal)
        console.error('Backup process was killed with singal ', signal);
    else 
        console.log('Successfully backedup the database')
});

async function createZipArchive() {
    try {
      const zip = new AdmZip();
      const outputFile = "dump.zip";
      zip.addLocalFolder("./backup");
      zip.writeZip(outputFile);
      console.log(`Created ${outputFile} successfully`);
    } catch (e) {
      console.log(`Something went wrong. ${e}`);
    }
  }

  createZipArchive();

const fileContent = fs.readFileSync("dump.zip")

const params = {
    Bucket: bucketName,
    Key: `dump.zip`,
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