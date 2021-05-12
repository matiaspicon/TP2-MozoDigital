const express = require('express');
const fs = require('fs')

const app = express();
const PORT = 3000;
const path = "./menu.json";

let menu = JSON.parse(fs.readFileSync(path, 'utf8'));

// http://locahost:3000/
app.get('/', (req, res) =>{
    res.send('Hola mundo Express');
});

// http://localhost:3000/api/menu
app.get('/api/menu', (req, res) =>{
    res.json(menu);
});

// http://localhost:3000/api/menu/platoId
app.get('/api/menu/:platoId', (req, res) =>{
    res.json(menu.platos[req.params.platoId]);
});

app.listen(PORT, () => { console.log('Servidor disponible')});