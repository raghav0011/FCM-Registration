FROM node:16

# Create app directory
WORKDIR D:\Work and projects\WL work\User-registration API\user-registration API\backend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Set the environment variable for the app port
ENV PORT=3000

# Expose the app port
EXPOSE $PORT

# Start the app
CMD ["npm", "start"]