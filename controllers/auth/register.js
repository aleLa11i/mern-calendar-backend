const { response } = require("express");
const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const {generateJWT} = require("../../helpers/json-web-token");
const { body } = require("express-validator");



//Registro
const createUser = async (req, res = response) => {

 
    const { name, email, password } = req.body;
    
    try {
  
      //consulto si existe un usuario con ese email, si es asi, devuelvo un 400
      if(await User.findOne({ email }))
      {
        return res.status(400).json({
          ok:false,
          msg: "El usuario ya existe."
        })
      }
  
      //creo un nuevo usuario
      const newUser = new User(req.body);
      
      //Encripto la contraseña
      const salt = bcrypt.genSaltSync(10);
      newUser.password = bcrypt.hashSync(password, salt)
      
      //Genero el token
      const token = await generateJWT(newUser.id, name)
  
  
      // Guardo el usuario
      await newUser.save();
  
      //Si todo sale bien, devuelvo un 201 con un mensaje de registrado
      return res.status(201).json({
        ok: true,
        msg: "Registrado.",
        uid: newUser.id,
        name,
        password:newUser.password,
        token
      });
  
    } 
    catch (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error de base de datos.",
        err
      });
    }
  };
  
  module.exports = createUser;
  