const { response } = require("express");
const Events = require("../../models/Events");

const deleteEvent = async (req, res = response) => {

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

        //busco por id y elimino evento en la base de datos
        const deleteEvent = await Events.findByIdAndDelete(id);

        //Si esta todo0 ok devuelvo un 201
        res.status(201).json({
          ok: true,
          msg: "Evento eliminado",
          deleteEvent
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
  
    module.exports = deleteEvent;