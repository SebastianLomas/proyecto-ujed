import example from '../assets/img/example.jpeg'
import "./css/Post.css"
function Post() {
    return (
        <section className="post">
            <header className="post__header">
                <p className="post__header__text">
                    Ah, look at all the lonely people
                    Ah, look at all the lonely people
                    Eleanor Rigby
                    Picks up the rice in the church where a wedding has been
                    Lives in a dream
                    Waits at the window
                    Wearing the face that she keeps in a jar by the door
                    Who is it for?
                </p>
            </header>
            <picture className="post__frame">
                <img className='post__frame__pic' src={example} alt="post" />
            </picture>
        </section>
    )
}

export default Post