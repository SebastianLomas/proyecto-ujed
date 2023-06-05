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
const connectedUsers = []
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
    console.log(req.file === undefined ? 'No File Selected' : req.file.path)
    console.log(req.body.tabDest)
    // Si una imagen es creada, se envia la ruta a la carpéta static y el nombre del archivo
    // si no, se declara como null
    if((typeof req.body.imageChat) === "string") {
<<<<<<< HEAD
        const messageObject = {
            id: id, 
            userName: req.body.posterName, 
            posterImage: req.body.posterImage, 
            message: req.body.messageChat, 
            image: req.body.imageChat, 
            tabDest: req.body.tabDest, 
            postDate: req.body.postDate
        }
=======
        const messageObject = {id: id, userName: req.body.posterName, posterImage: req.body.posterImage, message: req.body.messageChat, image: req.body.imageChat, tabDest: req.body.tabDest}
>>>>>>> bf31e3b6def96a89bf34ee890257c44c5c53af7a
        const messageJSON = JSON.stringify(messageObject)
        id++
        res.status(200).json(messageObject)
        wsServer.sendToUsers(wss, messageJSON)
    } else {
<<<<<<< HEAD
        const messageObject = {
            id: id, 
            userName: req.body.posterName, 
            posterImage: req.body.posterImage, 
            message: req.body.messageChat, 
            image: req.file === undefined ? null : `http://localhost:8080/static/uploads/images/${req.file.originalname}`, 
            tabDest: req.body.tabDest, 
            postDate: req.body.postDate
        }
        const messageJSON = JSON.stringify(messageObject)
        id++
        res.status(200).json(messageObject)
        console.log(req.body.postDate)
=======
        const messageObject = {id: id, userName: req.body.posterName, posterImage: req.body.posterImage, message: req.body.messageChat, image: req.file === undefined ? null : `http://localhost:8080/static/uploads/images/${req.file.originalname}`, tabDest: req.body.tabDest}
        const messageJSON = JSON.stringify(messageObject)
        id++
        res.status(200).json(messageObject)
>>>>>>> bf31e3b6def96a89bf34ee890257c44c5c53af7a
        wsServer.sendToUsers(wss, messageJSON)
    }
})

app.use('/static', express.static('static'))

function addOrModifyConnectedUsers(message, ws) {
    let userExist = false

    if(connectedUsers.length) {
        for(let i = 0;i < connectedUsers.length;i++) {
            if(connectedUsers[i].user === message.user) {
                connectedUsers[i].tab = message.tab
                userExist = true
            }
        }

        if(!userExist) {
            connectedUsers.push({user: message.user, tab: message.tab, ws: ws})
        }
    } else {
        connectedUsers.push({user: message.user, tab: message.tab, ws: ws})
    }

    //console.log(connectedUsers)
}

wss.on('connection', ws => {
    console.log("conexion")
    ws.on('message', (message) => {
        const connectedUserData = JSON.parse(message)
        addOrModifyConnectedUsers(connectedUserData, ws)
        //console.log(connectedUserData)
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