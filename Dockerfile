FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt update -y
RUN apt install ffmpeg -y

RUN npm ci

COPY . .

CMD ["npm", "start"]