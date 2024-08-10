FROM node:18

ARG VERSION
ARG BUILD
ARG BRANCH

ENV VERSION=${VERSION} \
    BRANCH=${BRANCH} \
    BUILD=${BUILD}

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends apt-utils && \
    apt-get install -y nginx yarn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npm install -g typescript ts-node

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV=production

RUN yarn run build && \
    rm -rf /var/www/html && \
    mv /app/dist/spa /var/www/html

ENTRYPOINT ["/bin/sh"]

CMD ["docker-serve.sh"]