#push base image nodejs image
FROM node:18.12

# setting working directory
WORKDIR /node/app

# copy package.json and package-lock.json to the container
COPY package*.json /node/app

# installing the depencies into the container
RUN npm install
 
# copy code to application
COPY . .

# container exposed network port number
EXPOSE 8082

# command to run within the container
CMD ["npm", "start"]

