FROM ubuntu:20.04

RUN apt-get update && apt-get install -y mongodb && apt-get install -y nodejs
RUN mongo --version

WORKDIR /usr/app

COPY . /usr/app/

CMD ["bash", "sequential-exec.sh" ]
#CMD ["node", "restore.js" ]