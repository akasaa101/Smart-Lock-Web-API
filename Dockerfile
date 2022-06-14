FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
RUN apk --no-cache add --virtual builds-deps build-base python
COPY . .

CMD ["npm", "start"]