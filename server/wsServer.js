const {express, WebSocket, http} = require('./global')

function createWSServer() {
    // Crea el servidor WS
    const app = express()
    const server = http.createServer(app)
    server.listen(8000, () => {
        console.log("Server 8000")
    })
    return new WebSocket.Server({server})
}

function sendToUsers(wssObject, msg) {
    //Esta funcion envia a todos los clientes el mensaje deseado
    wssObject.clients.forEach((clients) => {
        if(clients.readyState === WebSocket.OPEN) {
            clients.send(msg)
        }
    })
}

module.exports = {
    createWSServer,
    sendToUsers
}