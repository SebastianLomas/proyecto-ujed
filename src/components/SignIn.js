import ujedLogo from '../assets/img/ujed-logo-1.png'
import './css/SignIn.css'
import {FaGoogle} from 'react-icons/fa'


function SignIn(props) {
    return (
        <article className="signin-screen">
            <header className="signin-screen__header">
                <h1 className="signin-screen__header-text">universidad juarez<br></br>del estado de durango</h1>
                <picture className="signin-screen__header-logo">
                    <img src={ujedLogo} alt="UJED LOGO" />
                </picture>
            </header>
            <article className="signin-screen__welcome">
                <div className='signin-screen__welcome-text'>
                    <h1><p>¡hola!</p>bienvenidos</h1>
                    <span>al sistema de auncios de <span>ujed</span></span>
                </div>
            </article>
            <section className='signin-screen__form'>
                <div className='signin-button' onClick={props.logInHandler}>
                    <span><FaGoogle /></span>
                    <span>iniciar sesion</span>
                </div>
            </section>
            <footer className='signin-screen__footer'>
                <span>es necesario ingresar con tu <span>cuenta institucional</span></span>
            </footer>
        </article>
    )
}

export default SignIn