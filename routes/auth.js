/*
Auth 
host + /api/auth
*/

const { check } = require("express-validator");
const { Router } = require("express");
const router = Router();
const { validErr } = require("../middlewares/validErr");
const validJWT = require("../middlewares/validToken");
const createUser = require("../controllers/auth/register");
const renewToken = require("../controllers/auth/renew");
const loginUser = require("../controllers/auth/login");


router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("password", "La contraseña debe ser de por lo menos 8 caracteres.").isLength({ min: 8 }),
    check("email", "El email es inválido.").isEmail(),
    validErr,
  ],
  createUser
);

router.post(
  "/",
  [
    check("password", "La contraseña es obligatoria.").not().isEmpty(),
    check("email", "El email es inválido.").isEmail(),
    validErr,
  ],
  loginUser
);

router.get("/renew",validJWT, renewToken);

module.exports = router;
