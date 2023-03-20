FROM node:alpine

# Create app directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

RUN npm install -g --force nodemon  

COPY . .

# Set the environment variable for the app port
EXPOSE 3000

# Start the app
# CMD ["npm", "Server.js"]
CMD ["nodemon","-L","Server.js"]