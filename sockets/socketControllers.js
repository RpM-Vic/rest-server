
//socketController.js
const {validarJWThelper} = require('../helpers/generarJWT.js');
const { Socket } = require("socket.io"); //used only in development
const {ChatMessages,Message}= require ('../models/chatMessages');

const chatMessages= new ChatMessages();

//const socketController= (socket)=>{//this is the one that must be used in production
const socketController= (socket= new Socket,io)=>{//this one is used only in development 
    console.log('Connected to server',socket.id);
    socket.emit('ServerGreet', { message: 'The Server is greeting' });

    const userF= async  ()=>{
        const user= await validarJWThelper(socket.handshake.headers['x-token'])
        if (user.error) {
            console.log('Error en el token', user.msg);
            socket.disconnect()
        }

        //add the conected user 
        chatMessages.connectUser(user)
        io.emit('activeUsers',chatMessages.userArray)

        //clean when someone disconnects
        socket.on('disconnect',()=>{
            chatMessages.disconnectUser(user);
            console.log(`The user ${user.correo} has disconnected`);
            io.emit('activeUsers',chatMessages.userArray)
        })

        socket.on('clientMessage',({uid,message})=>{
            chatMessages.sendMessage(user.id,user.correo,message);
            io.emit('reciveMessages',chatMessages.latestMessages)

        })












    }
    userF();
}

module.exports = {socketController};
