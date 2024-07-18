
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

//connect to a custom room
        socket.join(user.correo,()=>{})// global, socket.id and user.correo

        socket.on('clientMessage',({uid,message})=>{

            if(uid){
                socket.to(user.correo).emit('reciveDirecMessages',{de: user.correo , message});
            }
            chatMessages.sendMessage(user.id,user.correo,message);
            io.emit('reciveMessages',chatMessages.latestMessages)

        })
//_________________________________________________________________________
//default messages


        //add the conected user 
        chatMessages.connectUser(user)
        io.emit('activeUsers',chatMessages.userArray)

        //clean when someone disconnects
        socket.on('disconnect',()=>{
            chatMessages.disconnectUser(user);
            console.log(`The user ${user.correo} has disconnected`);
            io.emit('activeUsers',chatMessages.userArray)
        })

    }
    userF();
}

module.exports = {socketController};
