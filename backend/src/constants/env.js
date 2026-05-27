const getEnv = (key, defaultValue) => {
  const val = process.env[key] || defaultValue;
  if (val === undefined) {
    throw new Error(`Enviroment variable ${key} is undefined.`);
  }
  return val;
};

const PORT = getEnv("PORT");
const NODE_ENV = getEnv("NODE_ENV");

module.exports = { PORT, NODE_ENV };
