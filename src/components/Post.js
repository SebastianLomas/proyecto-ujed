import example from '../assets/img/example.jpeg'
import "./css/Post.css"
function Post(props) {
    return (
        <section className="post">
            <header className="post__header">
                <p className="post__header__text">{props.postText}</p>
            </header>
            <picture className="post__frame">
                <img className='post__frame__pic' src={example} alt="post" />
            </picture>
        </section>
    )
}

export default Post