const { response } = require("express");
const Events = require("../../models/Events");


const getEvents = async (req, res = response) => {

    const events = await Events.find()
      
    res.status(201).json({
      ok: true,
      msg: "Eventos obtenidos",
      events
    });
  };
  
  module.exports = getEvents;