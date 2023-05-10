import "./css/MessageBar.css"

function MessageBar() {
    return (
        <section className="message-bar">
            <section className="message-bar__media-button">
                <span>I</span>
            </section>
            <section className="message-bar__message-box">
                <textarea className="message-bar__message-box__text"></textarea>
            </section>
        </section>
    )
}

export default MessageBar