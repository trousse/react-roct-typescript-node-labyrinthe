//require("babel-core").transform("code");
var server = require('http').createServer();
var io = require('socket.io')(server);
const NewClient = require("./socket.js").NewClient;
import { lockerGrid } from './labyrintheClasse';
import { Asigner } from './asigner';
//constante (need to be in conf file)
const nbPlayerByRoom = 6;
//declaration
var compteur = 0;
const grid = new lockerGrid(5, 5);
const asigner = new Asigner(io);
//on client connect => listen event define in Newclient
//create new client handle by playerHanler
io.on('connection', (client) => {
    let room = asigner.asign();
    //client.on('wait',()=> console.log('waiting'));
    client.on('wait', () => client.emit('asigned', room));
    console.log('client connect asign on ' + room);
});
server.listen(8080);