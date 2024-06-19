FROM node:18.16.0-alpine3.17
USER node
WORKDIR /app
COPY --chown=node package*.json .
RUN npm install
COPY --chown=node . .
    
EXPOSE 9428

CMD ["npm", "run", "start"]
