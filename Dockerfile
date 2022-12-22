FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npm i ffmpeg-static

COPY . .

CMD ["npm", "start"]