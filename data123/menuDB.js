const connection = require('./connection');
let objectId = require('mongodb').ObjectId;
const dataSucursal = require('./sucursalesDB.js');

async function getMenu(idRestaurante, idSucursal){
    const sucursal = await dataSucursal.getSucursal(idRestaurante, idSucursal);
    return sucursal.menu;
}

async function getMenuItem(idRestaurante, idSucursal, idMenuItem){
    const menu = await getMenu(idRestaurante, idSucursal)
    const menuItem = menu.find(menuItem => menuItem._id == idMenuItem)
    return menuItem;
}

async function addMenuItem(idRestaurante, idSucursal, menuItem){
    const sucursal = await dataSucursal.getSucursal(idRestaurante, idSucursal);
    sucursal.menu.push(menuItem);
    const result = await dataSucursal.updateSucursal(idRestaurante, sucursal);
    return result;
}

async function updateMenuItem(idRestaurante, idSucursal, menuItem){
    const sucursal = await dataSucursal.getSucursal(idRestaurante, idSucursal);
    const menu = sucursal.menu;
    const index = menu.findIndex(menuIt => menuIt._id == menuItem._id);
    if(menuItem.titulo){
        menu[index].titulo = menuItem.titulo;
    }
    if(menuItem.precio){
        menu[index].precio = menuItem.precio;
    }
    if(menuItem.descripcion){
        menu[index].descripcion = menuItem.descripcion;
    }
    if(menuItem.url_imagen){
        menu[index].url_imagen = menuItem.url_imagen;
    }
    if(menuItem.categoria){
        menu[index].categoria = menuItem.categoria;
    }
    if(menuItem.habilitado){
        menu[index].habilitado = menuItem.habilitado;
    }
    const result = await dataSucursal.updateSucursal(idRestaurante, sucursal);
    return result;
}

async function deleteMenuItem(idRestaurante, idSucursal, idMenuItem){
    const sucursal = await dataSucursal.getSucursal(idRestaurante, idSucursal);
    const menu = sucursal.menu;
    menu.pop(menuItem => menuItem._id == idMenuItem);
    const result = await dataSucursal.updateSucursal(idRestaurante, sucursal);
    return result;
}

module.exports = {getMenu, getMenuItem, addMenuItem, updateMenuItem, deleteMenuItem};