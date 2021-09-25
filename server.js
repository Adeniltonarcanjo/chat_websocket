const express = require('express');

const app = express();

//tornando o diretório public usavél pelo express
app.use(express.static('public'));

const http = require('http').Server(app);

const serverSocket = require('socket.io')(http);


const PORT=3000|| process.env.PORT;

http.listen(PORT, function(){

console.log("servidor iniciado na porta 3000");

});

// ao acessar a raiz do site , carregar a pagina html
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
})



serverSocket.on('connection', function(socket){    

    
    socket.on('login', function(nickname){
        //console.log('cliente conectado '+nickname)
        serverSocket.emit('chat msg',  `${nickname} entrou na sala`)
        socket.nickname=nickname
    })
   
    
    // ao executar mensagem chat msg, executar a função
    socket.on('chat msg', function(msg){
      //  console.log(`Msg recebida do cliente ${socket.nickname}: ${msg}`);
        serverSocket.emit('chat msg',`${socket.nickname}: ${msg}`);
    })

    socket.on('status', function(msg){
        //  console.log(`Msg recebida do cliente ${socket.nickname}: ${msg}`);
          socket.broadcast.emit('status',msg);
      })

    
});

