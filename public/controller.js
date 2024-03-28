;(function () {
  let receiverID
  const socket = io()
  function generateID() {
    return `${Math.trunc(Math.random() * 999)}-${Math.trunc(
      Math.random() * 999
    )}-${Math.trunc(Math.random() * 999)}`
  }

  document
    .querySelector('#sender-start-con-btn')
    .addEventListener('click', function () {
      let joinID = '484-800-549'
      document.querySelector('#join-id').innerHTML = `
            <b>Room ID<b/>
            <span>${joinID}</span>
        `
      socket.emit('sender-join', {
        uid: joinID,
      })
    })
})()
