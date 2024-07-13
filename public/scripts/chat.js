
//chats.js
//let socket = null;

// References
const url = window.location.href.includes('localhost')? 'http://localhost:3000/auth' : 'custom';
const textUid = document.querySelector('#textUid');
const textMsg = document.querySelector('#textMsg');
const ulUsers = document.querySelector('#ulUsers');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');
 
const validarJWThtml = async () => {
    const token = localStorage.getItem("token") || '';
    if (!token) {
        //window.location = 'index.html';
        throw new Error('No token');
    }

    fetch(url + '/validate', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    })
    .then(data => data.json()) 
    .then((data) => {
        if (data.ok) {
            //localStorage.setItem("token", data.usuario.token); // token updated
            console.log('Token validated:', data);
        } else {
            console.error('Token validation failed:', data);
            //window.location = 'index.html';
        }
    })
    .catch ((error) =>{
        console.error('Error validating token:', error);
        //window.location = 'index.html';
    }) 
};
validarJWThtml()    
/* 

const conectSocket = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found for WebSocket connection');
        return;
    }

    socket = io({
        extraHeaders: {
            'x-token': token
        }
    });

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('serverGreet', ({ payload }) => {
        console.log({ payload });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
};

const main = async () => {
    try {
        await validarJWT();
        await conectSocket();
    } catch (error) {
        console.error('Main function error:', error);
    }
};

main();

  */