
require('dotenv').config();

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
async function googleVerify(token='') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.IDcliente,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const {name, picture, email} = ticket.getPayload();
  //const userid = payload['sub'];

  return {
    nombre:name, 
    img:picture, 
    correo:email
    }
  // If the request specified a Google Workspace domain:
  // const domain = payload['hd'];
}
googleVerify().catch(console.error);

module.exports = {googleVerify};
