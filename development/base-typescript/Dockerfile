FROM node:alpine

WORKDIR /opt/app

USER root

COPY . .

RUN yarn global add typescript && \
	yarn install && \
	yarn run build

ENTRYPOINT yarn run start