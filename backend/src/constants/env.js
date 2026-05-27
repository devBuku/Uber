const getEnv = (key, defaultValue) => {
  const val = process.env[key] || defaultValue;
  if (val === undefined) {
    throw new Error(`Enviroment variable ${key} is undefined.`);
  }
  return val;
};

const PORT = getEnv("PORT");
const NODE_ENV = getEnv("NODE_ENV");
const MONGO_URI = getEnv("MONGO_URI");
const JWT_SECRET = getEnv("JWT_SECRET");

module.exports = { PORT, NODE_ENV, MONGO_URI, JWT_SECRET };
