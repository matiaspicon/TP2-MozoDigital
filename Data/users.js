const mongodb = require('mongodb');
const connection = require('./connection');
let objectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getAllUsers() {
    const clientmongo = await connection.getConnection();
    const users = await clientmongo.db('MozoDigital')
                        .collection('Usuarios')
                        .find()
                        .toArray();
    return users;
}

async function addUser(user) {
    const clientmongo = await connection.getConnection();
    user.password = await bcrypt.hash(user.password, 8);
    const result = await clientmongo.db('MozoDigital')
                        .collection('Usuarios')
                        .insertOne(user);
    return result;
}

async function getUser(idUser) {
    const clientmongo = await connection.getConnection();
    const user = await clientmongo.db('MozoDigital')
                        .collection('Usuarios')
                        .findOne({_id: mongodb.ObjectId(idUser)});
    return user;
}

async function findByCredential(email, password) {
    const clientmongo = await connection.getConnection();
    const user = await clientmongo.db('MozoDigital')
                        .collection('Usuarios')
                        .findOne({email: email});

    if(!user) {
        throw new Error('Credencial no válida');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Credencial no válida');
    }

    return user;
}

function generateAuthToken(user) {
    const token = jwt.sign({_id: user._id}, 'ultrasecret', {expiresIn: '2h'});
    return token;
}

module.exports = {getAllUsers, addUser, getUser, findByCredential, generateAuthToken};