const express = require('express')
const WebSocket = require('ws')
const http = require('http')
const path = require('path')

function createWSServer() {
    const app = express()
    const server = http.createServer(app)
    server.listen(8000, () => {
        console.log("Server 8000")
    })
    return new WebSocket.Server({server})
}

const idxPath = path.resolve(__dirname,"..","chat","build")
const wss = createWSServer()

wss.on('connection', ws => {
    console.log("conexion")

    ws.on('message', (message) => {
        wss.clients.forEach((clients) => {
            if(clients.readyState === WebSocket.OPEN) {
                clients.send(message)
            }
        })
        console.log(message.toString())
        //ws.send(message)
    })

    ws.on('error', (event) => {
        console.log('hubo un error '+ event)
    })

    ws.on('close', () => {
        console.log("Se cerro la conexion")
    })
})