#dev container
FROM mcr.microsoft.com/devcontainers/base:alpine-3.19 AS dev
RUN apk update
RUN apk upgrade
RUN apk add nodejs npm
RUN mkdir /workspace

#prod container
FROM alpine:3.19 AS prod
RUN apk update
RUN apk upgrade
RUN apk add nodejs npm
WORKDIR /app/universal-blog-api
COPY ./app ./app
COPY ./public ./public
COPY ./next-env.d.ts ./next-env.d.ts
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json
RUN npm install
RUN npm run build
EXPOSE 3001
ENTRYPOINT npm start