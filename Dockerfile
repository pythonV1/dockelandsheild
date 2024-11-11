# Use the official Node.js image
FROM node:18

# Set the working directory
#WORKDIR /app

# Copy the package.json and install dependencies
#COPY package.json /app/
#RUN npm install

# Copy the rest of the app's source code
#COPY . /app/

# Build the React app for production
RUN npm run build

# Expose port 3000 for the React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
