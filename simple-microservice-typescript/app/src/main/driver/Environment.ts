const Environment = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_URI_PORT: process.env.SERVER_URI_PORT
    ? 3000 : parseInt(`${process.env.SERVER_URI_PORT}`),
  SERVER_REQUEST_TIMEOUT: process.env.SERVER_REQUEST_TIMEOUT || '1s',
  STORAGE_MONGO_HOSTNAME: process.env.STORAGE_MONGO_HOSTNAME || 'localhost',
  STORAGE_MONGO_PORT: process.env.STORAGE_MONGO_PORT || '27017',
  STORAGE_MONGO_USERNAME: process.env.STORAGE_MONGO_USERNAME || 'develop',
  STORAGE_MONGO_PASSWORD: process.env.STORAGE_MONGO_PASSWORD || 'develop',
  STORAGE_MONGO_CONNECT_POOL_SIZE: process.env.STORAGE_MONGO_CONNECT_POOL_SIZE
    ? 1000 : parseInt(`${process.env.STORAGE_MONGO_CONNECT_POOL_SIZE}`),
  STORAGE_MONGO_CONNECT_TIMEOUT: process.env.STORAGE_MONGO_CONNECT_TIMEOUT
    ? 30000 : parseInt(`${process.env.STORAGE_MONGO_CONNECT_TIMEOUT}`)
})

export { Environment }