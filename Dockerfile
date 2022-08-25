FROM node:16

ARG VERSION
ARG BUILD
ARG BRANCH

ENV VERSION=${VERSION} \
    BRANCH=${BRANCH} \
    BUILD=${BUILD}

WORKDIR /app

RUN npm install -g typescript ts-node

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build:ssr

EXPOSE 3085

CMD [ "yarn", "run", "start" ]
