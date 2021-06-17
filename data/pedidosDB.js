const connection = require("./connection");
const objectId = require("mongodb").ObjectId;

async function getPedidos() {
  const clientmongo = await connection.getConnection();
  const pedidos = await clientmongo
    .db("MozoDigital")
    .collection("Pedidos")
    .find()
    .toArray();
  return pedidos;
}

async function getPedido(idPedido) {
  const clientmongo = await connection.getConnection();
  const pedido = clientmongo
    .db("MozoDigital")
    .collection("Pedidos")
    .findOne({ _id: new objectId(idPedido) });
  return pedido;
}

async function addPedido(pedido) {
  const clientmongo = await connection.getConnection();
  const result = await clientmongo
    .db("MozoDigital")
    .collection("Pedidos")
    .insertOne(pedido);
  return result;
}

async function updatePedido(pedido) {
  const clientmongo = await connection.getConnection();
  const query = { _id: new objectId(pedido._id) };

  const pedidoExistente = await getPedido(pedido._id);

  if (pedido.menuItems) {
    pedidoExistente.menuItems = pedido.menuItems;
  }

  if (pedido.estado) {
    pedidoExistente.estado = pedido.estado;
  }

  const newvalues = {
    $set: {
      cliente: pedidoExistente.cliente,
      menuItems: pedidoExistente.menuItems,
      estado: pedidoExistente.estado,
    },
  };

  const result = await clientmongo
    .db("MozoDigital")
    .collection("Pedidos")
    .updateOne(query, newvalues);

  return result;
}

//MANEJAMOS EL UPDATE ESTADO DESDE EL PUT DE PEDIDO? (SOLO SE PODRÍA ACTUALIZAR EL ESTADO DEL PEDIDO)
//EN TAL CASO EL METODO updateEstado HABRIA QUE ELIMINARLO
// async function updateEstado(pedido) {
//   const clientmongo = await connection.getConnection();
//   const query = { _id: new objectId(pedido._id) };

//   const pedidoExistente = await getPedido(pedido._id);

//   if (pedido.estado) {
//     pedidoExistente.estado = pedido.estado;
//   }

//   const newvalues = {
//     $set: {
//       cliente: pedidoExistente.cliente,
//       menuItems: pedidoExistente.menuItems,
//       precio: pedidoExistente.precio,
//       estado: pedidoExistente.estado,
//     },
//   };

//   const result = await clientmongo
//     .db("MozoDigital")
//     .collection("Pedidos")
//     .updateOne(query, newvalues);

//   return result;
// }

async function deletePedido(idPedido) {
  const clientmongo = await connection.getConnection();
  const result = await clientmongo
    .db("MozoDigital")
    .collection("Pedidos")
    .deleteOne({ _id: new objectId(idPedido) });
  return result;
}

module.exports = {
  getPedidos,
  getPedido,
  addPedido,
  updatePedido,
  //updateEstado,
  deletePedido,
};
