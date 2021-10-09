const express = require("express");
const dotenv = require("dotenv").config();
const {PORT} = process.env;
const cors = require("cors");
const Auth = require("./routes/auth");
const Event = require("./routes/events");
const app = express();
const { DBconnect } = require("./db/config");

app.use( express.static("public") );
app.use( express.json() );
app.use(cors());
app.use("/api/auth", Auth );
app.use("/api/events", Event );

DBconnect();

app.listen( PORT, () =>{
    console.log(`Servidor corriendo en puerto ${ PORT }`);
} )