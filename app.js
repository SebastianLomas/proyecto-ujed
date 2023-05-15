const  { WebSocket } = require('./server/global')
const wsServer = require('./server/wsServer')

const wss = wsServer.createWSServer()

wss.on('connection', ws => {
    console.log("conexion")
    ws.on('message', (message) => {
        wsServer.sendToUsers(wss,message)
    })

    ws.on('error', (event) => {
        console.log('hubo un error '+ event)
    })

    ws.on('close', () => {
        console.log("Se cerro la conexion")
    })
})