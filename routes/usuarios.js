var express = require("express");
var router = express.Router();
const dataUsuarios = require("../data/usuariosDB.js");
const auth = require("../middleware/auth.js");
const joi = require("joi");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const usuarios = await dataUsuarios.getUsuarios();
  res.send(usuarios);
});

router.get("/:idUsuario", async (req, res) => {
  const usuario = await dataUsuarios.getUsuario(req.params.idUsuario);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

// --------------------POST---------------------------------

router.post("/", async (req, res) => {
  const schema = joi.object({
    nombre: joi.string().required(),
    apellido: joi.string().required(),
    password: joi.string().alphanum().required(),
    email: joi.string().required(),
    rol: joi.string().required(),    
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    let usuario = req.body;
    usuario = await dataUsuarios.addUsuario(usuario);
    res.json(usuario);
  }
});

router.post("/login", async (req, res) => {
  try {
    const usuario = await dataUsuarios.findByCredential(
      req.body.email,
      req.body.password
    );
    const token = dataUsuarios.generateAuthToken(usuario);
    res.send({ usuario, token });
  } 
  catch (error) {
    res.status(401).send(error.message);
  }
});

// --------------------PUT----------------------------------

router.put("/:idUsuario", async (req, res) => {
  const schema = joi.object({
    nombre: joi.string(),
    apellido: joi.string(),
    password: joi.string().alphanum(),
    email: joi.string(),
    rol: joi.string(),    
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    let usuario = req.body;
    usuario._id = req.params.idUsuario;
    dataUsuarios.updateUsuario(usuario);
    res.send("Usuario actualizado correctamente");
  }
});

// --------------------DELETE-------------------------------

router.delete("/:idUsuario", async (req, res) => {
  const usuario = await dataUsuarios.getUsuario(req.params.idUsuario);
  if (!usuario) {
    res.status(404).send("Usuario no encontrado");
  } else {
    dataUsuarios.deleteUsuario(req.params.idUsuario);
    res.status(200).send("Usuario eliminado");
  }
});

module.exports = router;
