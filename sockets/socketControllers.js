
//socketController.js
const {validarJWThelper} = require('../helpers/generarJWT.js');
const { Socket } = require("socket.io"); //used only in development

//const socketController= (socket)=>{//this is the one that must be used in production
const socketController= (socket= new Socket)=>{//this one is used only in development 
    console.log('Connected to server',socket.id);
    socket.emit('ServerGreet', { message: 'Hello World' });

    console.log(socket.handshake.headers['x-token'])
    const userF= async  ()=>{
        const user= await validarJWThelper(socket.handshake.headers['x-token'])
        if (user.error) {
            console.log('Error en el token', user.msg);
            socket.disconnect()
        }
        else {
            console.log('It is connected', user)
        }
    }
    userF();
    

    

}

module.exports = {socketController};
