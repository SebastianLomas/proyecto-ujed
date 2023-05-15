import "./css/MessageBar.css"
import { BsUpload } from 'react-icons/bs'

function MessageBar(props) {
    function writeMsg() {
        const msg = document.getElementById('chat_message').value

        if(msg) {
            props.sendMsgProp(msg)
        }
    }

    return (
        <section className="message-bar">
            <label className="message-bar__media-button" htmlFor="imageInput">
                <input 
                    className="message-bar__media-button__input" 
                    type="file" accept="image/*" 
                    id="imageInput">
                </input>
                <BsUpload className="icon" />
            </label>
            <section className="message-bar__message-box">
                <label className="message-bar__message-area" htmlFor="chat_message">
                    <textarea 
                        className="message-bar__message-box__text" 
                        id="chat_message"
                        placeholder="Enviar Mensaje"></textarea>
                    <div className="message-bar__button" onClick={writeMsg}>
                        <span>&gt;</span>
                    </div>
                </label>
            </section>
        </section>
    )
}

export default MessageBar