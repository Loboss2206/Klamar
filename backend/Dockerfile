FROM node:18-alpine AS build
RUN mkdir /app && chown node:node /app
WORKDIR /app/
COPY --chown=node package*.json ./
RUN npm install && npm cache clean --force
COPY --chown=node . ./
RUN apk add --update curl && rm -rf /var/cache/apk/*
USER node

EXPOSE 9428
CMD ["npm", "run", "start"]