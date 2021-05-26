const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

async function getRestaurantes(){
    const clientmongo = await connection.getConnection();
    console.log(clientmongo);
    const restaurantes = await clientmongo.db('MozoDigital')
                    .collection('Restaurantes')
                    .find()
                    .toArray();
    return restaurantes;
}

async function getRestaurante(idRestaurante){
    const clientmongo = await connection.getConnection();
    const restaurante = await clientmongo.db('MozoDigital')
                    .collection('Restaurantes')
                    .findOne({_id: new objectId(idRestaurante)});
    return restaurante;
}


async function addRestaurante(restaurante){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('MozoDigital')
                    .collection('Restaurantes')
                    .insertOne(restaurante);
    return result;
}

async function updateRestaurante(restaurante){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(restaurante._id)};
    const newvalues = { $set:{
            nombre: restaurante.nombre,
            color_principal: restaurante.color_principal,
            logo: restaurante.logo,
            sucursales: restaurante.sucursales
        }
    };

    const result = await clientmongo.db('MozoDigital')
                    .collection('Restaurantes')
                    .updateOne(query, newvalues);
    return result;
}

async function deleteRestaurante(idRestaurante){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('MozoDigital')
                    .collection('Restaurantes')
                    .deleteOne({_id: new objectId(idRestaurante)});
    return result;
}

module.exports = {getRestaurantes, getRestaurante, addRestaurante, updateRestaurante, deleteRestaurante};