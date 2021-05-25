const mongoclient = require('mongodb').MongoClient;
// TODO utilizar varibales de entorno
const uri = "mongodb+srv://admin:mozo1234@clustermozodigital.ripob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new mongoclient(uri);

let instance = null;

async function getConnection(){
    if(instance == null){
        try {
            instance = await client.connect();
        } catch (err) {
            console.log(err.message);
            throw new Error('problemas al conectarse con mongo');
        }
    }
    return instance;
}

module.exports = {getConnection};
