const express = require('express');
const router = express.Router();
const dataRestaurante = require('../Data/restaurantesDB.js');
const dataSucursal = require('../Data/sucursalesDB.js');
const dataMenu = require('../Data/menuDB.js');


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

router.post('/', async (req, res)=>{
    //TODO: Validacion
    let restaurante = req.body;
    restaurante = await dataRestaurante.addRestaurante(restaurante);
    res.json(restaurante);
});

router.post('/:idRestaurante/sucursales', async (req, res)=>{
    //TODO: Validacion
    let sucursal = req.body;
    sucursal = await dataSucursal.addSucursal(req.params.idRestaurante, sucursal);
    res.json(sucursal);
});

router.post('/:idRestaurante/sucursales/:idSucursal/menu', async (req, res)=>{
    //TODO: Validacion
    let menuItem = req.body;
    menuItem = await dataMenu.addMenuItem(req.params.idRestaurante, req.params.idSucursal, menuItem);
    res.json(menuItem);
});

router.put('/:idRestaurante', async (req, res)=>{
    //TODO: validacion
    let restaurante = req.body;
    restaurante._id = req.params.idRestaurante;
    dataRestaurante.updateRestaurante(restaurante);
    res.json(restaurante);
});

router.put('/:idRestaurante/sucursales/:idSucursal', async (req, res)=>{
    //TODO: validacion
    let sucursal = req.body;
    sucursal._id = req.params.idSucursal;
    dataSucursal.updateSucursal(req.params.idRestaurante, sucursal);
    res.json(sucursal);
});

router.put('/:idRestaurante/sucursales/:idSucursal/menu/:idMenuItem', async (req, res)=>{
    //TODO: validacion
    let menuItem = req.body;
    menuItem._id = req.params.idMenuItem;
    dataMenu.updateMenu(req.params.idRestaurante, req.params.idSucursal, menuItem);
    res.json(menuItem);
});

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