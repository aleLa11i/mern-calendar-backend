const { DB } = process.env;
const mongoose = require("mongoose");

const DBconnect = async () => {
    
    try{
        await mongoose.connect(DB)
        console.log("Conectado a la Base de datos.");
    }
    catch{
        console.log("Error en la Base de datos.");
      throw new Error("Error en la DB");
    }
};

module.exports = { DBconnect };
