import Post from "./Post"
import MessageBar from "./MessageBar"
import { useState } from "react"

import "./css/Chat.css"

function Chat() {
    const [msgs, setMsg] = useState([])

    let ws = null

    function connectWS() {
        ws = new WebSocket(`ws://localhost:8000/`)
        ws.addEventListener('open', () => {
            console.log('Sesion iniciada')
        })

        ws.addEventListener('message',(ev) => {
            const msgObject = ev.data.text()

            msgObject.then(response => {
                const msgCopy = [...msgs]
                msgCopy.unshift(JSON.parse(response))
                setMsg(msgCopy)
                console.log(response)
            })

            console.log('Llego un mensaje')
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
                        return <Post key={item.id} postText={item.msg} />
                    })
                }
                <MessageBar sendMsgProp={sendMsg}/>
            </section>
        </section>
    )
}

export default Chat