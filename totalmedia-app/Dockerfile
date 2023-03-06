# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:lts-slim as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install
# RUN apt-get update -y
# RUN apt-get install -y gettext-base
# RUN envsubst < src/environments/environment.template.ts > src/environments/environment.production.ts

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/totalmedia-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80