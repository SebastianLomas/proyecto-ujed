import Post from "./Post"
import MessageBar from "./MessageBar"
import { useEffect, useState, useRef } from "react"

import "./css/Chat.css"
import "./css/Post.css"

function Chat(props) {
    const [update, setUpdate] = useState(false)
    const tabDest = useRef('general')
    //const loadedDb = useRef(false)

    useEffect(() => {
        //console.log(props.db.loadedData)
        if(!props.db.loadedDb.current) {
            props.db.get(addToMessageState)
            props.db.loadedDb.current = true
            connectWS()
        }
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
        const postedDate = new Date(parseInt(incomingMessage.postDate))
        if(incomingMessage.tabDest === tabDest.current) {
            let section = document.createElement("section");
            section.className = "post";
          
            let header = document.createElement("header");
            header.className = "post__header";
          
            let article = document.createElement("article");
            article.className = "post__header__poster";
          
            let picture = document.createElement("picture");
            picture.className = "post__header__poster__pic";
          
            let img = document.createElement("img");
            img.src = incomingMessage.posterImage;
            img.alt = "";
          
            picture.appendChild(img);
            article.appendChild(picture);
          
            let username = document.createElement("span");
            username.className = "post__header__poster__username";
            username.textContent = incomingMessage.userName.toLowerCase();
            article.appendChild(username);

            const postDate = document.createElement("span")
            postDate.className = "post__header__post-date"
            postDate.textContent = ` • ${postedDate.toLocaleDateString('en-GB')} • ${postedDate.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hourCycle: 'h23'})}`
          
            article.appendChild(postDate)
            header.appendChild(article);
          
            let text = document.createElement("p");
            text.className = "post__header__text";
            text.textContent = incomingMessage.message;
            header.appendChild(text);
          
            section.appendChild(header);
          
            if(incomingMessage.image) {
                let pictureFrame = document.createElement("picture");
                pictureFrame.className = "post__frame";
              
                let postImage = document.createElement("img");
                postImage.className = "post__frame__pic";
                postImage.src = incomingMessage.image;
                postImage.alt = "post";
              
                pictureFrame.appendChild(postImage);
                section.appendChild(pictureFrame);
            }
    
            //document.getElementById('chatBody').appendChild(section)
            document.getElementById('chatBody').insertBefore(section, document.getElementById('chatBody').firstChild)
        }
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
            if(lastSelected[0]) {
                lastSelected[0].classList.remove("chat__header__title-selected")
            }
            if(tabSelected.className === "chat__header__title") {
                tabSelected.classList.add("chat__header__title-selected")
                tabDest.current = tabSelected.textContent
            } else {
                tabSelected.parentElement.classList.add("chat__header__title-selected")
                tabDest.current = tabSelected.textContent
            }

            forceUpdate()

            const posts = [...document.getElementsByClassName("post")]
            posts.forEach(node => {
                document.getElementById('chatBody').removeChild(node)
            })

            props.db.get(addToMessageState)
        }
    }

    function forceUpdate() {
        if(update) {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }
    
    if((props.userMail.includes('ujed') && !props.userMail.includes('alumnos')) || props.userMail === 'lomaslopezsebastian@gmail.com') {
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
                <section className="chat__body" id="chatBody">
                    <MessageBar sendMsgProp={sendMsg} userName={props.userName} profilePicUrl={props.profilePicUrl} tabDest={tabDest.current} addToDb={props.db.add}/>
                </section>
            </section>
        )
    } else {
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
                <section className="chat__body" id="chatBody">
                </section>
            </section>
        )
    }
}

export default Chat