import "./css/MessageBar.css"

function MessageBar() {
    return (
        <section className="message-bar">
            <section className="message-bar__media-button">
                <span>I</span>
            </section>
            <section className="message-bar__message-box">
                <label className="message-bar__message-area" htmlFor="chat_message">
                    <textarea 
                        className="message-bar__message-box__text" 
                        id="chat_message"
                        placeholder="Enviar Mensaje"></textarea>
                </label>
            </section>
        </section>
    )
}

export default MessageBar