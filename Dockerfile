### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:latest as builder

# build-time variables
# prod|sandbox its value will be come from outside
ARG HTTPS_PROXY=""

# Move our files into directory name "app"
WORKDIR /app
COPY package.json package-lock.json  /app/
RUN cd /app && npm install
COPY .  /app

# Build with $env variable from outside
RUN cd /app && npm run build:prod

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
