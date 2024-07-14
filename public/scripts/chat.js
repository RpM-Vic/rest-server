
//chats.js
//let socket = null;

// References
const url = window.location.href.includes('localhost')? 'http://localhost:3000/auth' : 'custom';
const textUid = document.querySelector('#textUid');
const textMsg = document.querySelector('#textMsg');
const ulUsers = document.querySelector('#ulUsers');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');
const DocTitle = document.querySelector('#DocTitle');

 
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
            DocTitle.innerText = data.usuario.correo;
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
//_______________________________________________________________________
const paintUsers = async (users = []) => {   
    console.log('users', users);
    let usersHtml = 'hi every one';
    users.forEach(user => {
        usersHtml += `
        <li>
            <p>
                <h5 class="text-success">${user.nombre}</h5>
                <span class="fs-6 text-muted">${user.correo}</span>
            </p>
        </li>
        `;
    });
    ulUsers.innerHTML = usersHtml;
};

//_____________________________________________________________________
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
    
    socket.on('receiveMessage', (payload) => {
        console.log(payload);
    });    

    socket.on('activeUsers', await paintUsers);

    socket.on('reciveDirecMessages', ({ message }) => {
        console.log({ message });
    }); 

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('ServerGreet', ({ message }) => {
        console.log({ message });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
//_______________________________________________________________________________________

};

const main = async () => {
    try {
        await validarJWThtml();
        await conectSocket();
    } catch (error) {
        console.error('Main function error:', error);
    }
};

main();

 