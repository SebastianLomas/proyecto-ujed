const  { WebSocket, express, multer, path } = require('./server/global')
const wsServer = require('./server/wsServer')

const storage = multer.diskStorage({
    destination: "static/uploads/images/",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const app = express()
const upload = multer({storage})
const wss = wsServer.createWSServer()
let id = 0

app.use((req,res,next) => {
    // Para permitir peticiones desde el server dev de React
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.post('/sendMessage', upload.single('imageChat'), (req, res) => {
    // Al fetch se le regresa un objeto cuando es exitoso
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({message: 'Hola desde el server'})
    console.log(req.file === undefined ? 'No File Selected' : req.file.path)

    // Si una imagen es creada, se envia la ruta a la carpéta static y el nombre del archivo
    // si no, se declara como null
    const messageObject = {id: id, message: req.body.messageChat, image: req.file === undefined ? null : `http://localhost:8080/static/uploads/images/${req.file.originalname}`}
    const messageJSON = JSON.stringify(messageObject)
    id++
    wsServer.sendToUsers(wss, messageJSON)
})

app.use('/static', express.static('static'))

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

app.listen(8080, () => {
    console.log('Corriendo en '+ 8080)
})