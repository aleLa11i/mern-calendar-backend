const { response } = require("express");
const Event = require("../../models/Events");

const postEvent = async (req, res = response) => {
      
    //Creamos un nuevo evento con los datos traidos 
    const event = new Event(req.body)
    try {
      
      
      //Le pasamos los datos del user al evento creado
      //Estos datos se agregan al req cuando validamos el token con la funcion validJWT en events
      event.user = {
        uid: req.uid,
        name: req.name
      }

      //Guardamos evento en la BD
      const saveEvent = await event.save();

      return res.status(201).json({
        ok: true,
        msg: "Evento creado",
        event: saveEvent
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

  module.exports = postEvent;