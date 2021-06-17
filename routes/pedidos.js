var express = require("express");
var router = express.Router();
const dataPedidos = require("../data/pedidosDB.js");
const auth = require("../middleware/auth.js");
const joi = require("joi");

/* GET users listing. */
router.get("/", auth, async function (req, res, next) {
  const pedidos = await dataPedidos.getPedidos();
  if (req.user.rol == "Encargado"){
    res.send(pedidos);
  } else if (req.user.rol == "Cocinero") {
    res.send(pedidos.filter(pedido => 
      pedido.estado == "Pedido" || pedido.estado == "En preparacion" ))
  } else if (req.user.rol == "Mozo") {
    res.send(pedidos.filter(pedido => pedido.estado == "Listo"))
  } else {
    res.status(401).send("Usuario no autorizado");
  }
  
});

router.get("/:idPedido", auth, async (req, res) => {
  const pedido = await dataPedidos.getPedido(req.params.idPedido);
  if (pedido) {
    if (req.user.rol == "Encargado"){
      res.send(pedido);
    } else if (req.user.rol == "Cocinero" && (pedido.estado == "Pedido" || pedido.estado == "En preparacion" )) {
        res.send(pedido)
    } else if (req.user.rol == "Mozo" && pedido.estado == "Listo") {
      res.send(pedido)
    } else if (req.user.rol == "Cliente" && pedido.cliente == req.user._id) {
      res.send(pedido)
    } else {
      res.status(401).send("Usuario no autorizado");
    }
  } else {
    res.status(400).send("Bad request");
  }
});

// --------------------POST---------------------------------

router.post("/", auth, async (req, res) => {
  if (req.user.rol == "Cliente") {
    req.body.cliente = req.user._id;
    console.log(req.body);
    const schema = joi.object({
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
  } else {
    res.status(401).send("Usuario no autorizado");
  }
});

// --------------------PUT----------------------------------

router.put("/:idPedido", auth, async (req, res) => {
  if (req.user.rol == "Encargado" || req.user.rol == "Cocinero" || req.user.rol == "Mozo" ) {
    let actualizado = false;
    const schema = joi.object({
      menuItems: joi.array().items({
          _id: joi.number(),
          titulo: joi.string().max(40),
          cantidad: joi.number(),
          precio:  joi.number()
      }),
      estado: joi.string().required(),    
    });
    const result = schema.validate(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
    } else {
      let pedido;
      if (req.user.rol == "Cocinero" && (req.body.estado == "En preparacion" || req.body.estado == "Listo" )) {
        pedido = {estado: req.body.estado};
        actualizado = true;
      } else if (req.user.rol == "Mozo" && req.body.estado == "Entregado") {
        pedido = {estado: req.body.estado};
        actualizado = true;
      } else if (req.user.rol == "Encargado") {
        pedido = req.body;
        actualizado = true;
      }

      if (actualizado) {
        pedido._id = req.params.idPedido;
        dataPedidos.updatePedido(pedido);
        res.send("Pedido actualizado correctamente");
      } else {
        res.status(400).send("Bad request")
      }
    }
  } else {
    res.status(401).send("Usuario no autorizado");
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

router.delete("/:idPedido", auth, async (req, res) => {
  if (req.user.rol == "Encargado") {
    const pedido = await dataPedidos.getPedido(req.params.idPedido);
    if (!pedido) {
      res.status(404).send("Pedido no encontrado");
    } else {
      dataPedidos.deletePedido(req.params.idPedido);
      res.status(200).send("Pedido eliminado");
    }
  } else {
    res.status(401).send("Usuario no autorizado");
  }
});

module.exports = router;
