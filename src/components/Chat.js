import Post from "./Post"
import MessageBar from "./MessageBar"
import { useEffect, useState } from "react"

import "./css/Chat.css"

function Chat(props) {
    const [tabDest, setTabDest] = useState('general')
    const [msgs, setMsg] = useState([])

    useEffect(() => {
        //console.log(props.db.loadedData)
        props.db.get(addToMessageState)
    })

    let ws = null

    function connectWS() {
        ws = new WebSocket(`ws://localhost:8000/`)
        ws.addEventListener('open', () => {
            const connectedUserData = JSON.stringify({user: props.userName, tab: "general"})
            ws.send(connectedUserData)
            console.log('Sesion iniciada')
        })

        ws.addEventListener('message',(ev) => {
            //Aqui los usuarios reciben los post enviados por los directivos
            let incomingMessage = JSON.parse(ev.data)
            addToMessageState(incomingMessage)
        })

        ws.addEventListener('error', () => {
            console.log('Hubo un error')
        })

        ws.addEventListener('close', () => {
            console.log('Sesion Finalizada')
        })  
    }

    function addToMessageState(incomingMessage) {
        // Como seguridad, se hace una copia de state "msg" y el objeto regresado
        // por el websocket sera guardado al principio de la copia y despues
        // la copia reemplaza al original
        // Esto renderiza los post automaticamente
        const msgsCopy = [...msgs]
        msgsCopy.unshift(incomingMessage)
        setMsg(msgsCopy)
    }

    function sendMsg(message) {
        const msgJson = JSON.stringify({id: null, msg: message, user: "aa"})
        ws.send(msgJson)
    }

    function selectCategory(ev) {
        // Cuando se clickea una pestaña, busca si ya existe una pestaña activada.
        // Despues si el contenedor de la pestaña es cliqueado le agrega la clase
        // Si es el hijo, se lo agrega el padre
        ev.stopPropagation();
        const lastSelected = document.getElementsByClassName("chat__header__title-selected")
        const tabSelected = ev.target
        if(tabSelected !== lastSelected[0] && tabSelected !== lastSelected[0].children[0]) {
            const connectedUserData = JSON.stringify({user: props.userName, tab: tabSelected.textContent})
/*             console.log(connectedUserData)
            console.log(ev) */
            if(lastSelected[0]) {
                lastSelected[0].classList.remove("chat__header__title-selected")
            }
    
            if(tabSelected.className === "chat__header__title") {
                tabSelected.classList.add("chat__header__title-selected")
                ws.send(connectedUserData)
                setTabDest(tabSelected.textContent)
            } else {
                tabSelected.parentElement.classList.add("chat__header__title-selected")
                ws.send(connectedUserData)
                setTabDest(tabSelected.textContent)
            }
        }
    }

    connectWS()
    
    return (
        <section className="chat">
            <header className="chat__header">
                <article className="chat__header__title chat__header__title-selected" onClick={selectCategory}>
                    <span className="chat__header__title__text">
                        general
                    </span>
                </article>
                <article className="chat__header__title" onClick={selectCategory}>
                    <span className="chat__header__title__text">
                        directivo
                    </span>
                </article>
                <article className="chat__header__title" onClick={selectCategory}>
                    <span className="chat__header__title__text">
                        deportivo
                    </span>
                </article>
            </header>
            <section className="chat__body">
                {
                    msgs.map((item) => {
                        if(item.tabDest === tabDest) {
                            return <Post key={item.id} posterName={item.userName} posterImage={item.posterImage} postText={item.message} postImage={item.image}/>
                        }
                    })

                }
                <MessageBar sendMsgProp={sendMsg} userName={props.userName} profilePicUrl={props.profilePicUrl} tabDest={tabDest} addToDb={props.db.add}/>
            </section>
        </section>
    )
}

export default Chat