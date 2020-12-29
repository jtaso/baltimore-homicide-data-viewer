# Build Process

# Pull down a node docker image version 14.15.3
FROM node:14.15.3 as build

# Create the specified directory and set as current working directory
WORKDIR /app

# Copy files into docker image
COPY package.json .
COPY yarn.lock .

RUN yarn global add nodemon

RUN yarn

COPY . /app

CMD [ "npm", "start" ]