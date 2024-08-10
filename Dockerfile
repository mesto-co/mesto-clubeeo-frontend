FROM node:18

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

RUN yarn run build

EXPOSE 4000

CMD [ "yarn", "run", "serve" ]
