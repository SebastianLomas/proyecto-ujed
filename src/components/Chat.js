import Post from "./Post"
import MessageBar from "./MessageBar"

import "./css/Chat.css"

function Chat() {
    let ws = null

    function connectWS() {
        ws = new WebSocket(`ws://localhost:8000/`)
        ws.addEventListener('open', () => {
            console.log('Sesion iniciada')
        })

        ws.addEventListener('message',() => {
            alert('Llego un mensaje')
        })

        ws.addEventListener('error', () => {
            alert('Hubo un error')
        })

        ws.addEventListener('close', () => {
            alert('Sesion Finalizada')
        })  
    }

    function sendMsg(message) {
        const msgJson = JSON.stringify({msg: message, user: "aa"})
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
                <MessageBar sendMsgProp={sendMsg}/>
            </section>
        </section>
    )
}

export default Chat