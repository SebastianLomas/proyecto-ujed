import "./css/Post.css"
function Post(props) {
    // Si la imagen no es devuelta, solo renderiza el texto
    if(props.postImage) {
        return (
            <section className="post">
                <header className="post__header">
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
                    <p className="post__header__text">{props.postText}</p>
                </header>
            </section>
        )
    }
}

export default Post