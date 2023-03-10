FROM node:alpine

# Create app directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

# Set the environment variable for the app port
EXPOSE 5000

# Start the app
CMD ["node", "Server.js"]
# CMD ["npm", "run", "dev"]