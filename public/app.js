const socket = io('http://localhost:3000')

$('#chat').submit(e => {
  e.preventDefault()

  const author = $('input[name=username]').val()
  const message = $('input[name=message]').val()

  const renderMessage = message => {
    $('.messages').append('<div class="message"><strong>'+ message.author + ': </strong><span>'+ message.message +'</span></div>')
  }

  socket.on('messageReceived', data => {
    renderMessage(data)
  })

  if (message.length && author.length) {
    const messageObject = {
      author,
      message
    }

    renderMessage(messageObject)

    socket.emit('sendMessage', messageObject)
  }
})