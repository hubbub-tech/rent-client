# Start from a base image with Node.js and Yarn installed
FROM node:16.14.0 as build

WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

RUN yarn install --production

COPY . /app

RUN yarn build


# Stage 1, based on NGINX to provide a configuration to be used with react-router
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx.html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# set environment variables
ENV REACT_APP_SERVER=https://admin.hubbub.shop
ENV REACT_APP_MEASUREMENT_ID=UA-173171916-3
ENV REACT_APP_RECAPTCHA_API_KEY=6Ld6vxEjAAAAAF-BjsaswpZAq_UoZpcifR0Xn1x3
ENV REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyB8C5-SG8q1zlw7pC6e7eorLlzu3MuFefY
ENV REACT_APP_DT_CLOSEST_OPERATING=2
ENV REACT_APP_MIN_RESERVATION=1
ENV REACT_APP_DEBUG=false