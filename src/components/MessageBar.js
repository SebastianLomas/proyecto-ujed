import { useRef } from "react"
import "./css/MessageBar.css"
import { AiFillCloseCircle} from 'react-icons/ai'
import { BsUpload } from 'react-icons/bs'

function MessageBar(props) {
    function createMessage(ev) {
        //Crea un formdata a partir del elemento form. 
        //Se agrego messageBox e imageBox por que formbox.reset daba error
        ev.stopPropagation()
        const formBox = document.getElementById('messageForm')
        const messageBox = document.getElementById('messageChat')
        const imageBox = document.getElementById('imageChat')
        const posterName = props.userName
        const posterImage = props.profilePicUrl
        const messageForm = new FormData(formBox)
        const postDate = Date.now()
        messageForm.set('posterName',posterName)
        messageForm.set('posterImage',posterImage)
        messageForm.set('tabDest', props.tabDest)
        messageForm.set('postDate',postDate)

        if(messageForm.get('messageChat')) {
            sendMessageForm(messageForm)
            messageBox.value = ""
            imageBox.value = ""
        }
    }

    function sendMessageForm(messageFormData) {
        // Envia el formdata al servidor, regresa un mensaje si exitoso; error, si no.
        const fetchOptions = {
            method: 'POST',
            body: messageFormData
        }

        fetch('http://localhost:8080/sendMessage', fetchOptions)
            .then(response => response.json())
            .then(data => {
                console.table(data)
                props.addToDb(data.userName, data.posterImage, data.message, data.image, data.tabDest, data.postDate)
            })
            .catch(error => {
                console.log(`Hubo un error: ${error}`)
            })
    }

    function showFullBar(ev) {
        ev.stopPropagation()
        const messageBar = document.querySelector(".message-bar")
        const closeButton = document.querySelectorAll(".closeButton")[0]
        messageBar.classList.add("message-bar--full")
        closeButton.style.display = "block"
    }

    function closeFullBar(ev) {
        ev.stopPropagation()
        const messageBar = document.querySelector(".message-bar")
        const closeButton = document.querySelectorAll(".closeButton")[0]
        const messageBox = document.getElementById('messageChat')
        const imageBox = document.getElementById('imageChat')
        messageBar.classList.remove("message-bar--full")
        closeButton.style.display = "none"
        messageBox.value = ""
        imageBox.value = ""
        removeImageFromPreview()
    }

    function showSelectedImage(ev) {
        try {
            ev.stopPropagation()
            const imagePreview = document.querySelector(".imagePreview")
            imagePreview.style.display = "block"
            imagePreview.src = URL.createObjectURL(ev.target.files[0])
        } catch(error) {
            console.log(error)
        }
    }

    function removeImageFromPreview(ev) {
        const imagePreview = document.querySelector(".imagePreview")
        const imageChat = document.querySelector("#imageChat")
        imagePreview.src = ""
        imagePreview.style.display = "none"
        imageChat.value = ""
    }

    return (
        <form className="message-bar" id="messageForm" onClick={showFullBar}>
            <AiFillCloseCircle className="closeButton" onClick={closeFullBar}/>
            <label className="message-bar__media-button" htmlFor="imageChat">
                <input 
                    className="message-bar__media-button__input" 
                    type="file" accept="image/*" 
                    name="imageChat"
                    id="imageChat"
                    onChange={showSelectedImage}
                    >
                </input>
                <BsUpload className="icon" />
            </label>
            <section className="message-bar__message-box">
                <label className="message-bar__message-area" htmlFor="messageChat">
                    <textarea 
                        className="message-bar__message-box__text" 
                        name="messageChat"
                        id="messageChat"
                        placeholder="Enviar Mensaje"></textarea>
                    <div className="message-bar__button" onClick={createMessage}>
                        <span>&gt;</span>
                    </div>
                </label>
                <section className="imagePreview__container">
                    <AiFillCloseCircle className="closeButton" onClick={removeImageFromPreview} />
                    <img className="imagePreview" alt="image preview" />
                </section>
            </section>
        </form>
    )
}

export default MessageBar