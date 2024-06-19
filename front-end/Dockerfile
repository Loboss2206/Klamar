FROM node:18.16.0-alpine3.17 AS build
ARG ENVIRONMENT=production
RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app/
COPY --chown=node package*.json ./
RUN npm install
COPY --chown=node . ./
RUN npm run build -- --configuration=$ENVIRONMENT
RUN npm prune --production && \
    rm -rf /app/node_modules /app/src /app/public /app/package*.json

FROM nginx:alpine3.17
COPY default.conf /etc/nginx/conf.d/
RUN mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx
RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid
USER nginx
COPY --from=build /app/dist/front-end /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
