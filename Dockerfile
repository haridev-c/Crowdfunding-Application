#stage 1 - build client
FROM node:22.13.1-slim AS build-stage

# Environment variables
ENV NODE_OPTIONS=--max-old-space-size=4096

#set working directory
WORKDIR /app

#copy package.json and package-lock.json and install dependencies
COPY client/package*.json ./client/
RUN cd client && npm ci

#copy all files and build
COPY client/ ./client/
RUN cd client && npm run build

#stage 2 - final image
FROM node:22.13.1-slim

# Environment variables
ENV NODE_ENV=production

#set working directory
WORKDIR /app

#copy package.json and package-lock.json and install dependencies
COPY ./server/package*.json ./server/
RUN cd server &&  npm ci

#copy all files
COPY server/ ./server/

#copy build files from build-stage
COPY --from=build-stage /app/client/dist ./server/views/

#set new working directory
WORKDIR /app/server

#expose port
EXPOSE 5050

CMD [ "npm", "run", "prod" ]