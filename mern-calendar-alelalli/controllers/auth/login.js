
const { response } = require("express");
const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const {generateJWT} = require("../../helpers/json-web-token");


//Login
const loginUser = async (req, res = response) => {
    const { password, email } = req.body;
    try {
  
      const user = await User.findOne({ email });
  
      //Controla que el mail ingresado exista
      if(!user)
      {
        return res.status(400).json({
          ok:false,
          msg: "Usuario no encontrado."
        })
      }
  
      //Compara la contraseña ingresada con la contraseña encriptada, si no es valida devuelve un 400
      const valid = bcrypt.compareSync(password, user.password);
  
      if(!valid)
      {
        return res.status(400).json({
          ok:false,
          msg: "Contraseña inválida."
        })
      }
  
      //Genero el token
      const token = await generateJWT(user.id, user.name)
  
      //Si todo sale bien, devuelvo un 201 con un mensaje de logeado
      return res.status(201).json({
        ok: true,
        msg: "Logeado",
        email,
        name: user.name,
        token
      });
      
    } 
  
    catch (err) {
  
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error de base de datos.",
      });
    }
  };

  
  module.exports = loginUser;