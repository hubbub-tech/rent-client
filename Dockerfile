# Start from a base image with Node.js and Yarn installed
FROM node:16.14.0 as build

WORKDIR /app
COPY . /app

RUN yarn install --production
RUN yarn build

# Stage 1, based on NGINX to provide a configuration to be used with react-router
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]