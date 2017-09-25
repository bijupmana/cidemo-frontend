FROM node:8
MAINTAINER Julie Ng <julie.ng@allianz.de>

WORKDIR /workspace

COPY ["package.json", "./"]

RUN npm install

COPY [".", "./"]
