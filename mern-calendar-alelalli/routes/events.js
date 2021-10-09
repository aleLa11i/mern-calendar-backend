/*
    Event Routes
    /api/events
 */

const deleteEvent = require("../controllers/events/deleteEvent");
const getEvents = require("../controllers/events/getEvents");
const postEvent = require("../controllers/events/postEvent");
const putEvent = require("../controllers/events/putEvent");
const validJWT = require("../middlewares/validToken");
const { Router } = require("express");
const { check } = require("express-validator");
const { validErr } = require("../middlewares/validErr");
const isDate = require("../helpers/isDate");
const router = Router();


// Esto permite que cada vez que se quiera hacer cualquiera de las 4 acciones de abajo antes 
// se valide que el token esta activo
router.use(validJWT);

router.get("/", getEvents);

router.post("/",[
    
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start"," Fechas obligatorias ").custom(isDate),
    check("end"," Fechas obligatorias ").custom(isDate),
    validErr


], postEvent);

router.put("/:id",[
    
    // check("password", "La contraseña es obligatoria.").not().isEmpty(),
    validErr

], putEvent);

router.delete("/:id",[
    
    // check("password", "La contraseña es obligatoria.").not().isEmpty(),
    validErr

], deleteEvent);

module.exports = router;
