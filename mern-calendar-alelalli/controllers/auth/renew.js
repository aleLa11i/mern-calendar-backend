const { response } = require("express");
const { generateJWT } = require("../../helpers/json-web-token");

const renewToken = async (req, res = response) => {

  console.log(req)

    const {uid,name} = req;

    const token = await generateJWT(uid, name)    

    res.status(201).json({
      ok: true,
      msg: "Token renovado.",
      uid,
      name,
      token
    });
  };

  module.exports = renewToken;