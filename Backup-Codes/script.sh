echo "Hi"

#mongoexport --host mongo --port 27017 -d user_creds --collection creds --out=creds.json
mongodump --forceTableScan --host mongo --port 27017
node -v

pwd
ls