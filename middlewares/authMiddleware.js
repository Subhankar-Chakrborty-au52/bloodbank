require("dotenv").config();
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    JWT.verify(token, process.env.SECRET_KEY, (error, decode) => {
      if (error) {
        res.status(401).send({
          success: false,
          message: "Authorization failed",
          error,
        });
      } else {
        req.body.UserId = decode.UserId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Authorization failed",
    });
  }
};
