import "./css/Post.css"
import imageEx from '../assets/img/example.jpeg'
function Post(props) {
    // Si la imagen no es devuelta, solo renderiza el texto
    if(props.postImage) {
        return (
            <section className="post">
                <header className="post__header">
                    <article className="post__header__poster">
                        <picture className="post__header__poster__pic">
                            <img src={imageEx} alt="" />
                        </picture>
                        <span className="post__header__poster__username">
                            posteador
                        </span>
                    </article>
                    <p className="post__header__text">{props.postText}</p>
                </header>
                <picture className="post__frame">
                    <img className='post__frame__pic' src={props.postImage} alt="post" />
                </picture>
            </section>
        )
    } else {
        return (
            <section className="post">
                <header className="post__header">
                    <article className="post__header__poster">
                        <picture className="post__header__poster__pic">
                            <img src={imageEx} alt="" />
                        </picture>
                        <span className="post__header__poster__username">
                            posteador
                        </span>
                    </article>
                    <p className="post__header__text">{props.postText}</p>
                </header>
            </section>
        )
    }
}

export default Post