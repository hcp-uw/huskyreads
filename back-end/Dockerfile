FROM node:17-alpine3.14

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /deps
COPY app/package.json ./
RUN npm install

EXPOSE 8000

CMD ["npm", "start"]