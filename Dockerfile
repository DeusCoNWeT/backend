FROM node

WORKDIR  /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3800

CMD ["node", "index.js"]