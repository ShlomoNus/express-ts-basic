# 1. Use Node.js as the base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application files
COPY . .

# 6. Build the TypeScript code
RUN npm run build

# 7. Expose the application port
EXPOSE 5050

# 8. Set environment variables for Docker
ENV BASE_URL=http://localhost:5050
ENV DB_NAME=exampleDb
ENV PORT=5050
ENV SECRET=supersecret

# 9. Command to run the app
CMD ["npm", "run", "dev"]
