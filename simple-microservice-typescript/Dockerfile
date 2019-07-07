FROM node

ENV TZ="UTC" \
    NODE_ENV="development" \
    SERVER_URI_PORT="3000" \
    SERVER_REQUEST_TIMEOUT="200ms" \
    STORAGE_MONGO_HOSTNAME=database-"mongodb" \
    STORAGE_MONGO_PORT="27017" \
    STORAGE_MONGO_USERNAME="develop" \
    STORAGE_MONGO_PASSWORD="develop" \
    STORAGE_MONGO_CONNECT_POOL_SIZE="1000" \
    STORAGE_MONGO_CONNECT_TIMEOUT="60000"

RUN mkdir /workspace
WORKDIR /workspace

ADD . /workspace
WORKDIR /workspace/app

CMD sleep 120 && \
    npm install && \
    npm run test && \
    npm start