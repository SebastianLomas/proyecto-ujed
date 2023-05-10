import Post from "./Post"
import "./css/Chat.css"

function Chat() {
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
                <Post />
                <Post />
                <Post />
            </section>
        </section>
    )
}

export default Chat