
FROM node:13 as builder

ARG HTTPS_PROXY=""

WORKDIR /app
COPY package.json package-lock.json  /app/
RUN npm install -g
RUN cd /app && npm install
COPY .  /app
RUN npm i node-sass@latest
RUN npm i ng2-completer --save
RUN npm i ng2-smart-table --save
RUN cd /app && npm run build:prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
