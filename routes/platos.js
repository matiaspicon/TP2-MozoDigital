const express = require('express');
const router = express.Router();
//const dataMenu = require('../data/menu');

// /api/menu/
//router.get('/', async function(req, res, next) {
//    let menus = await dataMenu.getMenu();    
//    res.json(menus);
//});
//
//router.get('/:id', async (req,res)=>{
//    const menu = await dataMenu.getMenuByID(req.params.id);
//    if(menu){
//        res.json(menu);
//    } else {
//        res.status(404).send('menu no encontrado');
//    }
//});
//
//router.post('/', async (req, res)=>{
//    //TODO: Validacion
//    let menu = req.body;
//    menu = await dataMenu.addMenu(menu);
//    res.json(menu);
//});
//
//router.put('/:id', async (req, res)=>{
//    //TODO: validacion
//    let menu = req.body;
//    menu._id = req.params.id;
//    dataMenu.updateMenu(menu);
//    res.json(menu);
//});
//
//router.delete('/:id', async (req, res)=>{
//    const menu = await dataMenu.getMenu(req.params.id)
//    if(!menu){
//        res.status(404).send('Iventor no encontrado');
//    } else {
//        dataMenu.deleteMenu(req.params.id);
//        res.status(200).send('menu eliminado');
//    }
//});
//
//
//module.exports = router;