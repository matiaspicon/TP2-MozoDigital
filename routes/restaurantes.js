const express = require('express');
const router = express.Router();
const dataRestaurante = require('../data/restaurantesDB.js');
const dataSucursal = require('../data/sucursalesDB.js');
const dataMenu = require('../data/menuDB.js');
const joi = require('joi');

// --------------------GET----------------------------------

// /api/restaurantes/
router.get('/', async function(req, res, next) {
    let restaurantes = await dataRestaurante.getRestaurantes();    
    res.json(restaurantes);
});

router.get('/:idRestaurante', async (req,res)=>{
    const restaurante = await dataRestaurante.getRestaurante(req.params.idRestaurante);
    if(restaurante){
        res.json(restaurante);
    } else {
        res.status(404).send('Restaurante no encontrado');
    }
});

router.get('/:idRestaurante/sucursales', async (req,res)=>{
    const restaurante = await dataRestaurante.getRestaurante(req.params.idRestaurante);
    if(restaurante){
        res.json(restaurante.sucursales);
    } else {
        res.status(404).send('Sucursales no encontradas');
    }
});

router.get('/:idRestaurante/sucursales/:idSucursal', async (req,res)=>{
    const sucursal = await dataSucursal.getSucursal(req.params.idRestaurante, req.params.idSucursal);
    if(sucursal){
        res.json(sucursal);
    } else {
        res.status(404).send('Sucursal no encontrada');
    }
});

router.get('/:idRestaurante/sucursales/:idSucursal/menu', async (req,res)=>{
    const menu = await dataMenu.getMenu(req.params.idRestaurante, req.params.idSucursal);
    if(menu){
        res.json(menu);
    } else {
        res.status(404).send('Menu no encontrado');
    }
});

router.get('/:idRestaurante/sucursales/:idSucursal/menu/:idMenuItem', async (req,res)=>{
    const menuItem = await dataMenu.getMenuItem(req.params.idRestaurante, req.params.idSucursal, req.params.idMenuItem);
    if(menuItem){
        res.json(menuItem);
    } else {
        res.status(404).send('Menu item no encontrado');
    }
});

// --------------------POST---------------------------------

router.post('/', async (req, res)=>{
    const schema = joi.object({
        nombre: joi.string().required(),
        color_principal: joi.string().alphanum(),
        logo: joi.string(),
        sucursales: joi.array().items({
            _id: joi.number(),
            direccion: joi.string().required(),
            menu: joi.array().items({
                _id: joi.number(),
                titulo: joi.string().max(40).required(),
                precio: joi.number().required(),
                descripcion: joi.string(),
                url_imagen : joi.string(),
                categoria : joi.string(),
                habilitado: joi.boolean()
            }),
            telefono: joi.string(),
            horario: joi.string(),
            mail: joi.string().required()
        })        
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else{
        let restaurante = req.body;
        restaurante = await dataRestaurante.addRestaurante(restaurante);
        res.json(restaurante);
    }
    
});

router.post('/:idRestaurante/sucursales', async (req, res)=>{
    const schema = joi.object({
        _id: joi.number(),
        direccion: joi.string().required(),
        menu: joi.array().items({
            _id: joi.number(),
            titulo: joi.string().max(40).required(),
            precio: joi.number().required(),
            descripcion: joi.string(),
            url_imagen : joi.string(),
            categoria : joi.string(),
            habilitado: joi.boolean()
        }),
        telefono: joi.string(),
        horario: joi.string(),
        mail: joi.string().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else{
        let sucursal = req.body;
        sucursal = await dataSucursal.addSucursal(req.params.idRestaurante, sucursal);
        res.json(sucursal);
    }
});

router.post('/:idRestaurante/sucursales/:idSucursal/menu', async (req, res)=>{
    const schema = joi.object({
        _id: joi.number(),
        titulo: joi.string().max(40).required(),
        precio: joi.number().required(),
        descripcion: joi.string(),
        url_imagen : joi.string(),
        categoria : joi.string(),
        habilitado: joi.boolean()        
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else{
        let menuItem = req.body;
        menuItem = await dataMenu.addMenuItem(req.params.idRestaurante, req.params.idSucursal, menuItem);
        res.json(menuItem);
    }
});

// --------------------PUT----------------------------------

router.put('/:idRestaurante', async (req, res)=>{
    const schema = joi.object({
        nombre: joi.string(),
        color_principal: joi.string().alphanum(),
        logo: joi.string(),
        sucursales: joi.array().items({
            _id: joi.number(),
            direccion: joi.string(),
            menu: joi.array().items({
                _id: joi.number(),
                titulo: joi.string().max(40),
                precio: joi.number(),
                descripcion: joi.string(),
                url_imagen : joi.string(),
                categoria : joi.string(),
                habilitado: joi.boolean()
            }),
            telefono: joi.string(),
            horario: joi.string(),
            mail: joi.string()
        })        
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else{
        let restaurante = req.body;
        restaurante._id = req.params.idRestaurante;
        dataRestaurante.updateRestaurante(restaurante);
        res.json(restaurante);
    }
});

router.put('/:idRestaurante/sucursales/:idSucursal', async (req, res)=>{
    const schema = joi.object({
        _id: joi.number(),
        direccion: joi.string(),
        menu: joi.array().items({
            _id: joi.number(),
            titulo: joi.string().max(40),
            precio: joi.number(),
            descripcion: joi.string(),
            url_imagen : joi.string(),
            categoria : joi.string(),
            habilitado: joi.boolean()
        }),
        telefono: joi.string(),
        horario: joi.string(),
        mail: joi.string()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else{
        let sucursal = req.body;
        sucursal._id = req.params.idSucursal;
        dataSucursal.updateSucursal(req.params.idRestaurante, sucursal);
        res.json(sucursal);
    }
});

router.put('/:idRestaurante/sucursales/:idSucursal/menu/:idMenuItem', async (req, res)=>{
    const schema = joi.object({
        _id: joi.number(),
        titulo: joi.string().max(40),
        precio: joi.number(),
        descripcion: joi.string(),
        url_imagen : joi.string(),
        categoria : joi.string(),
        habilitado: joi.boolean()        
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else {
        let menuItem = req.body;
        menuItem._id = req.params.idMenuItem;
        dataMenu.updateMenuItem(req.params.idRestaurante, req.params.idSucursal, menuItem);
        res.json(menuItem);
    }
});

// --------------------DELETE-------------------------------

router.delete('/:idRestaurante', async (req, res)=>{
    const restaurante = await dataRestaurante.getRestaurante(req.params.idRestaurante)
    if(!restaurante){
        res.status(404).send('Restaurante no encontrado');
    } else {
        dataRestaurante.deleteRestaurante(req.params.idRestaurante);
        res.status(200).send('Restaurante eliminado');
    }
});

router.delete('/:idRestaurante/sucursales/:idSucursal', async (req, res)=>{
    const sucursal = await dataSucursal.getSucursal(req.params.idRestaurante, req.params.idSucursal);
    if(!sucursal){
        res.status(404).send('Sucursal no encontrada');
    } else {
        dataSucursal.deleteSucursal(req.params.idRestaurante, req.params.idSucursal);
        res.status(200).send('Sucursal eliminada');
    }
});

router.delete('/:idRestaurante/sucursales/:idSucursal/menu/:idMenuItem', async (req, res)=>{
    const menuItem = await dataMenu.getMenuItem(req.params.idRestaurante, req.params.idSucursal, req.params.idMenuItem);
    if(!menuItem){
        res.status(404).send('Menu item no encontrado');
    } else {
        dataMenu.deleteMenuItem(req.params.idRestaurante, req.params.idSucursal, req.params.idMenuItem);
        res.status(200).send('Menu item eliminado');
    }
});


module.exports = router;