const connection = require('./connection');
let objectId = require('mongodb').ObjectId;
const dataRestaurante = require('./restaurantesDB.js');

async function getSucursales(idRestaurante){
    const restaurante = await dataRestaurante.getRestaurante(idRestaurante);
    return restaurante.sucursales;
}

async function getSucursal(idRestaurante, idSucursal){
    const sucursales = await getSucursales(idRestaurante);
    const sucursal = sucursales.find(sucursal => sucursal._id == idSucursal);
    return sucursal;
}

async function addSucursal(idRestaurante, sucursal){
    const restaurante = await dataRestaurante.getRestaurante(idRestaurante);
    restaurante.sucursales.push(sucursal);
    const result = await dataRestaurante.updateRestaurante(restaurante);
    return result;
}

async function updateSucursal(idRestaurante, sucursal){
    const restaurante = await dataRestaurante.getRestaurante(idRestaurante);
    const sucursales = restaurante.sucursales;
    const index = sucursales.findIndex(suc => suc._id == sucursal._id);
    if(sucursal.direccion){
        sucursales[index].direccion = sucursal.direccion;
    }
    if(sucursal.menu){
        sucursales[index].menu = sucursal.menu;
    }
    if(sucursal.telefono){
        sucursales[index].telefono = sucursal.telefono;
    }
    if(sucursal.horario){
        sucursales[index].horario = sucursal.horario;
    }
    if(sucursal.mail){
        sucursales[index].mail = sucursal.mail;
    }
    const result = await dataRestaurante.updateRestaurante(restaurante);
    return result;
}

async function deleteSucursal(idRestaurante, idSucursal){
    const restaurante = await dataRestaurante.getRestaurante(idRestaurante);
    const sucursales = restaurante.sucursales;
    const index = sucursales.indexOf;
    sucursales.pop(sucursal => sucursal._id == idSucursal);
    const result = await dataRestaurante.updateRestaurante(restaurante);
    return result;
}

module.exports = {getSucursales, getSucursal, addSucursal, updateSucursal, deleteSucursal};