
//ChatMessages.js
class Message{
    constructor(uid,name,message){
        this.uid = uid;
        this.name= name;
        this.message = message;
    }
}

class ChatMessages{
    constructor(){
        this.messages=[]
        this.users={}

    }
    get latestMessages(){
        this.messages= this.messages.splice(0,10)
        return this.messages
    }
    get userArray(){
        return Object.values(this.users)
    }
    sendMessage(uid,name, message){
        this.messages.unshift(new message(uid, name,message))
    }

    connectUser(usuario){
        this.users[usuario.id]= usuario
    }

    disconnectUser(id){
        delete this.users[usuario]
    }
}

module.exports = {ChatMessages,Message}