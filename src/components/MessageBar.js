import "./css/MessageBar.css"
import { BsUpload } from 'react-icons/bs'

function MessageBar(props) {
    function createMessage() {
        //Crea un formdata a partir del elemento form. 
        //Se agrego messageBox e imageBox por que formbox.reset daba error
        const formBox = document.getElementById('messageForm')
        const messageBox = document.getElementById('messageChat')
        const imageBox = document.getElementById('imageChat')
        const posterName = props.userName
        const posterImage = props.profilePicUrl
        const messageForm = new FormData(formBox)
        messageForm.append('posterName',posterName)
        messageForm.append('posterImage',posterImage)
        messageForm.append('tabDest', props.tabDest)

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
                props.addToDb(data.userName, data.posterImage, data.message, data.image, data.tabDest)
            })
            .catch(error => {
                console.log(`Hubo un error: ${error}`)
            })
    }

    return (
        <form className="message-bar" id="messageForm">
            <label className="message-bar__media-button" htmlFor="imageChat">
                <input 
                    className="message-bar__media-button__input" 
                    type="file" accept="image/*" 
                    name="imageChat"
                    id="imageChat">
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
            </section>
        </form>
    )
}

export default MessageBar