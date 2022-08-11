const date = require('date-and-time')
  
// Creating object of current date and time 
// by using Date() 
const now  =  new Date();
  
// Formatting the date and time
// by using date.format() method
const value = date.format(now,'YYYY-MM-DD');
  
// Display the result
console.log("current date and time : " + value)

console.log("*** MONGO DUMPING : START ***")

spawn = require('child_process').spawn
let backupProcess = spawn('mongodump', [
    '--forceTableScan',
    '--host=mongo', // localrun : localhost
    '--port=27017',
    '--out='+value+'/'
]);

backupProcess.on('close', (code, signal) => {
    if (code)
        console.log('Backup process exited with code ', code);
    else if (signal)
        console.error('Backup process was killed with singal ', signal);
    else {
        console.log('Successfully backedup the database')
    }
});

console.log("*** MONGO DUMPING : END ***")