const express = require('express');

const app = express();

app.use(express.static('public'));

const http = require('http').Server(app);

const serverSocket = require('socket.io')(http);


const porta=8000

http.listen(porta, function(){
console.log("servidor iniciado na porta 8000");

});

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
})

serverSocket.on('connection', function(socket){
    console.log('cliente conectado '+socket.id)

    socket.on('chat msg', function(msg){
        console.log(`Msg recebida do cliente ${socket.io}: ${msg}`);
        serverSocket.emit('chat msg', msg)
    })

})

