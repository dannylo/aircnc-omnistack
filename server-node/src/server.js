const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio= require('socket.io');
const http = require('http');

const app = express();
//configurando aplicação para ouvir procolos HTTP e WebSocket
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};



//conectando ao cluster no atlas.
mongoose.connect('mongodb+srv://aircnc-user:aircncuser@aircnc-upwvj.mongodb.net/aircnc-bd?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Capturando usuários que ficam logados na aplicação
io.on('connection', socket =>{
    const { user } = socket.handshake.query;
    console.log('user logado= ', user);
    connectedUsers[user] = socket.id;
});

//definindo middleware para disponibilizar os users logados e seus sockets para
//toda a aplicação.
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

//plugin 
app.use(cors());
app.use(express.json());
//define a rota estática direcionando ela para a página de uploads.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


server.listen(3333);