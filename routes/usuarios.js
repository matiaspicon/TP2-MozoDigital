var express = require("express");
var router = express.Router();
const dataUsuarios = require("../data/usuariosDB.js");
const auth = require("../middleware/auth.js");
const joi = require("joi");


/* GET users listing. */

router.get("/", auth, async function (req, res) {
  if (req.user.rol == "Encargado") {
    const usuarios = await dataUsuarios.getUsuarios();
    res.send(usuarios);
  } else {
    res.status(401).send("Usuario no autorizado");
  }  
});

router.get("/me", auth, async (req, res) => {
  console.log(req.user._id)
  const usuario = await dataUsuarios.getUsuario(req.user._id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

router.get("/:idUsuario", auth, async (req, res) => {
  const usuario = await dataUsuarios.getUsuario(req.params.idUsuario);
  if (req.user.rol == "Encargado") {
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send("Usuario no encontrado");
    } 
  } else {
    res.status(401).send("Usuario no autorizado");
  } 
});


// --------------------POST---------------------------------

router.post("/", async (req, res) => {
  req.body.rol = "Cliente";
  const schema = joi.object({
    nombre: joi.string().required(),
    apellido: joi.string().required(),
    password: joi.string().alphanum().required(),
    email: joi.string().required(),
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

router.post("/empleado", auth, async (req, res) => {
  if (req.user.rol == "Encargado") {
    const schema = joi.object({
      nombre: joi.string().required(),
      apellido: joi.string().required(),
      password: joi.string().alphanum().required(),
      email: joi.string().required(),
      rol: joi.string().required(),
      restaurante: joi.string(),
      sucursal: joi.number(),
      mesas: joi.array()
    });

    const result = schema.validate(req.body);

    if (result.error) {
      res.status(400).send(result.error.details[0].message);
    } else {
      let usuario = req.body;
      usuario = await dataUsuarios.addUsuario(usuario);
      res.json(usuario);
    }
  } else {
    res.status(401).send("Usuario no autorizado");
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
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// --------------------PUT----------------------------------

router.put("/:idUsuario", auth, async (req, res) => {
  if (req.user.rol == "Encargado") {
    const schema = joi.object({
      nombre: joi.string(),
      apellido: joi.string(),
      password: joi.string().alphanum(),
      email: joi.string(),
      rol: joi.string(),
      restaurante: joi.string(),
      sucursal: joi.number(),
      mesas: joi.array()
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
  } else {
      res.status(401).send("Usuario no autorizado");
  } 
});

// --------------------DELETE-------------------------------

router.delete("/:idUsuario", auth, async (req, res) => {
  if (req.user.rol == "Encargado") {
    const usuario = await dataUsuarios.getUsuario(req.params.idUsuario);
    if (!usuario) {
      res.status(404).send("Usuario no encontrado");
    } else {
      dataUsuarios.deleteUsuario(req.params.idUsuario);
      res.status(200).send("Usuario eliminado");
    }
  } else {
    res.status(401).send("Usuario no autorizado");
  }
});

module.exports = router;
