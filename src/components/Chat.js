import Post from "./Post"
import MessageBar from "./MessageBar"
import { useState } from "react"

import "./css/Chat.css"

function Chat(props) {
    const [msgs, setMsg] = useState([])

    let ws = null

    function connectWS() {
        ws = new WebSocket(`ws://localhost:8000/`)
        ws.addEventListener('open', () => {
            console.log('Sesion iniciada')
        })

        ws.addEventListener('message',(ev) => {
            //Aqui los usuarios reciben los post enviados por los directivos
            let incomingMessage = JSON.parse(ev.data)
            // Como seguridad, se hace una copia de state "msg" y el objeto regresado
            // por el websocket sera guardado al principio de la copia y despues
            // la copia reemplaza al original
            // Esto renderiza los post automaticamente
            const msgsCopy = [...msgs]
            console.log(incomingMessage)
            msgsCopy.unshift(incomingMessage)
            setMsg(msgsCopy)
            console.log(JSON.parse(ev.data))
        })

        ws.addEventListener('error', () => {
            console.log('Hubo un error')
        })

        ws.addEventListener('close', () => {
            console.log('Sesion Finalizada')
        })  
    }

    function sendMsg(message) {
        const msgJson = JSON.stringify({id: null, msg: message, user: "aa"})
        ws.send(msgJson)
    }

    connectWS()
    
    return (
        <section className="chat">
            <header className="chat__header">
                <article className="chat__header__title">
                    <span className="chat__header__title__text">
                        general
                    </span>
                </article>
                <article className="chat__header__title chat__header__title-selected">
                    <span className="chat__header__title__text">
                        directivo
                    </span>
                </article>
                <article className="chat__header__title">
                    <span className="chat__header__title__text">
                        deportivo
                    </span>
                </article>
            </header>
            <section className="chat__body">
                {
                    msgs.map((item) => {
                        console.log(item)
                        return <Post key={item.id} posterName={item.userName} posterImage={item.posterImage} postText={item.message} postImage={item.image} />
                    })
                }
                <MessageBar sendMsgProp={sendMsg} userName={props.userName} profilePicUrl={props.profilePicUrl}/>
            </section>
        </section>
    )
}

export default Chat