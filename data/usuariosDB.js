const connection = require("./connection");
const objectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function getUsuarios() {
  const clientmongo = await connection.getConnection();
  const usuarios = await clientmongo
    .db("MozoDigital")
    .collection("Usuarios")
    .find()
    .toArray();
  return usuarios;
}

async function getUsuario(idUsuario) {
  const clientmongo = await connection.getConnection();
  const usuario = clientmongo
    .db("MozoDigital")
    .collection("Usuarios")
    .findOne({ _id: new objectId(idUsuario) });
  return usuario;
}

async function addUsuario(usuario) {
  const clientmongo = await connection.getConnection();
  usuario.password = await bcrypt.hash(usuario.password, 8);
  const result = await clientmongo
    .db("MozoDigital")
    .collection("Usuarios")
    .insertOne(usuario);
  return result;
}

async function findByCredential(email, password) {
  const clientmongo = await connection.getConnection();
  const usuario = await clientmongo
    .db("MozoDigital")
    .collection("Usuarios")
    .findOne({ email: email });

  if (!usuario) {
    throw new Error("Credencial no válida");
  }

  const isMatch = await bcrypt.compare(password, usuario.password);
  if (!isMatch) {
    throw new Error("Credencial no válida");
  }

  return usuario;
}

function generateAuthToken(usuario) {
  const token = jwt.sign({ _id: usuario._id, rol: usuario.rol }, process.env.SECRET, {  
    expiresIn: "2h",
  });
  return token;
}

async function updateUsuario(usuario) {
  const clientmongo = await connection.getConnection();
  const query = { _id: new objectId(usuario._id) };

  const usuarioExistente = await getUsuario(usuario._id);

  if (usuario.nombre) {
    usuarioExistente.nombre = usuario.nombre;
  }

  if (usuario.apellido) {
    usuarioExistente.apellido = usuario.apellido;
  }

  if (usuario.nick_name) {
    usuarioExistente.nick_name = usuario.nick_name;
  }

  if (usuario.password) {
    usuarioExistente.password = usuario.password;
  }

  if (usuario.email) {
    usuarioExistente.nombre = usuario.email;
  }

  if (usuario.password) {
    usuarioExistente.password = await bcrypt.hash(usuario.password, 8);
  }

  if (usuario.rol) {
    usuarioExistente.rol = usuario.rol;
  }

  const newvalues = {
    $set: {
      nombre: usuarioExistente.nombre,
      apellido: usuarioExistente.apellido,
      nick_name: usuarioExistente.nick_name,
      password: usuarioExistente.password,
      email: usuarioExistente.email,
      rol: usuarioExistente.rol,
    },
  };

  const result = await clientmongo.db("MozoDigital")
                                  .collection("Usuarios")
                                  .updateOne(query, newvalues);

  return result;
}

async function deleteUsuario(idUsuario) {
  const clientmongo = await connection.getConnection();
  const result = await clientmongo
    .db("MozoDigital")
    .collection("Usuarios")
    .deleteOne({ _id: new objectId(idUsuario) });
  return result;
}

module.exports = {
  getUsuarios,
  getUsuario,
  addUsuario,  
  findByCredential,
  generateAuthToken,
  updateUsuario,
  deleteUsuario,
};
