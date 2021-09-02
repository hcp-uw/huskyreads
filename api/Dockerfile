FROM node:14.17.5-alpine3.14

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

EXPOSE 8000

CMD ["npm", "start"]