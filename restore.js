const AdmZip = require("adm-zip");
const path = require("path");

async function extractArchive(filepath) {
  try {
    const zip = new AdmZip(filepath);
    const outputDir = `${path.parse(filepath).name}_extracted`;
    zip.extractAllTo(outputDir);

    console.log(`Extracted to "${outputDir}" successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

extractArchive("dump.zip");

spawn = require('child_process').spawn
let backupProcess = spawn('mongorestore', [
    '--verbose',
    '--host=localhost',
    '--port=27017',
    '--drop',
    '2022-08-11'
    ]);

backupProcess.on('exit', (code, signal) => {
    if(code) 
        console.log('Backup process exited with code ', code);
    else if (signal)
        console.error('Backup process was killed with singal ', signal);
    else 
        console.log('Successfully backedup the database')
});