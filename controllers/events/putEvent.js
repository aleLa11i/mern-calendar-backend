const { response } = require("express");
const Events = require("../../models/Events");

const putEvent = async (req, res = response) => {
  //Tomo de la URL los parametros, en este caso el parametro id porque asi lo defini
  const id = req.params.id;

  try {

    //Busco el evento segun el id si no lo encuentra devuelve 404
    const event = await Events.findById(id);
    console.log(event);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado por ese id.",
      });
    }


    // Me aseguro que la persona que esta logueada (cuando se verifica el token con valid JWT)
    // sea la misma que creo el evento
    const { uid,name } = event.user;
    if (req.uid !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permisos para modificar este evento",
      });
    }

    //creo nuevo evento pero con  la info modificada que se trae del req
    const newEvent = {
      ...req.body,
      user:{
        uid,
        name
      }
    }

    //busco por id y actualizo evento en la base de datos, el new:true es necesario para que devuelva
    //el evento actualizado en updateEvent
    const updateEvent = await Events.findByIdAndUpdate(id, newEvent, {new: true});

    return res.status(201).json({
      ok: true,
      msg: "Evento actualizado",
      updateEvent
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: "Error de base de datos.",
      err
    });
  }
};

module.exports = putEvent;
