
//chats.js
const socket=io();



socket.on('connect', () => {
    console.log('Connected to server');


    socket.on('serverGreet', ({payload} )=> {
    console.log({payload});

});

});


