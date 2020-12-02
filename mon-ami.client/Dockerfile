FROM node:14.15.0

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY package-lock.json ./

RUN npm install 

ENV PORT=8080

EXPOSE 8080

COPY . ./

CMD ["npm", "start"]