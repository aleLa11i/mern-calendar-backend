const jwt = require("jsonwebtoken");
const { SECRET_JWT_SEED } = process.env;

const generateJWT = (uid, name) => {
  return new Promise((res, rej) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("No se pudo resolver el token");
        }
        console.log("Se genero el token correctamente. Token: "+token)
        res(token);
      }
    );
  });
};

module.exports = {generateJWT};
