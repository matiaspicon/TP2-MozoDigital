var express = require("express");
var router = express.Router();
const dataPedidos = require("../data/pedidosDB.js");
//const auth = require("../middleware/auth.js");
const joi = require("joi");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const pedidos = await dataPedidos.getPedidos();
  res.send(pedidos);
});

router.get("/:idPedido", async (req, res) => {
  const pedido = await dataPedidos.getPedido(req.params.idPedido);
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).send("Pedido no encontrado");
  }
});

// --------------------POST---------------------------------

router.post("/", async (req, res) => {
  const schema = joi.object({
    cliente: joi.string().required(),  
    menuItems: joi.array().items({
        _id: joi.number().required(),
        titulo: joi.string().max(40).required(),
        cantidad: joi.number().required(),
        precio:  joi.number().required()
    }),
    estado: joi.string().required(),    
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    let pedido = req.body;
    pedido = await dataPedidos.addPedido(pedido);
    res.json(pedido);
  }
});

// --------------------PUT----------------------------------

router.put("/:idPedido", async (req, res) => {
  const schema = joi.object({
    cliente: joi.string(),  
    menuItems: joi.array().items({
        _id: joi.number(),
        titulo: joi.string().max(40),
        cantidad: joi.number(),
        precio:  joi.number()
    }),
    estado: joi.string(),    
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    let pedido = req.body;
    pedido._id = req.params.idPedido;
    dataPedidos.updatePedido(pedido);
    res.send("Pedido actualizado correctamente");
  }
});

//MANEJAMOS EL UPDATE ESTADO DESDE EL PUT DE PEDIDO? (SOLO SE PODRÍA ACTUALIZAR EL ESTADO DEL PEDIDO)
//EN TAL CASO EL METODO updateEstado HABRIA QUE ELIMINARLO
// router.put("/updateEstado/:idPedido", async (req, res) => {
//     const schema = joi.object({
//       estado: joi.string()
//     });
  
//     const result = schema.validate(req.body);
  
//     if (result.error) {
//       res.status(400).send(result.error.details[0].message);
//     } else {
//       let pedido = req.body;
//       pedido._id = req.params.idPedido;
//       dataPedidos.updateEstado(pedido);
//       res.send("Estado actualizado correctamente");
//     }
//   });

// --------------------DELETE-------------------------------

router.delete("/:idPedido", async (req, res) => {
  const pedido = await dataPedidos.getPedido(req.params.idPedido);
  if (!pedido) {
    res.status(404).send("Pedido no encontrado");
  } else {
    dataPedidos.deletePedido(req.params.idPedido);
    res.status(200).send("Pedido eliminado");
  }
});

module.exports = router;
