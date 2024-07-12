
//socketController.js

const { Socket } = require("socket.io"); //used only in development

//const socketController= (socket)=>{//this is the one that must be used in production
const socketController= (socket= new Socket)=>{//this one is used only in development 
    console.log('Connected to server',socket.id);
    socket.emit('ServerGreet', { message: 'Hello World' });
}

module.exports = {socketController};
