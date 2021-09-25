$(function () {
    // cliente conexão websocket com o servidor 
    const socket = io()
    socket.nickname = ''

    // mensagem que esta sendo enviada para o servidor 
    $('form').submit(() => submeterForm(socket))

    socket.on('chat msg', exibirMsg)
})


function exibirMsg(msg) {
    $('#mensagens').append($('<li>').text(msg))
}


function submeterForm(socket) {
    if (socket.nickname === '') {
        socket.nickname = $('#msg').val()
        socket.emit('login', socket.nickname)
        $('input').attr('placeholder', 'Digite uma mensagem');

        $('#button1').html('Enviar');

        $('#msg').keypress(() => informaUsuarioDigitando(socket))

        socket.on('status', exibirMsgStatus)

        $('#msg').keyup(() => socket.emit('status', ''))


    } else {
        socket.emit('chat msg', $('#msg').val())

    }

    $('#msg').val('');
    return false;

}



function exibirMsgStatus(msg) {
    $('#status').html(msg)
}


function informaUsuarioDigitando(socket) {
    if (socket.nickname === '') {
        return
    }

    socket.emit('status', `${socket.nickname} está digitando...`)
}