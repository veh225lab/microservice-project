#Base of image
FROM node:18-alpine

#Define variables
ARG APP_NAME

#Create working directory

WORKDIR /usr/src/app

COPY package*.json ./

#Install app dependencies

RUN yarn install

#Bundle app source

COPY . .

#Create a "dist" folder with the production build

RUN yarn run build -- ${APP_NAME}

CMD ["node","dist/apps/${APP_NAME}/main.js"]

