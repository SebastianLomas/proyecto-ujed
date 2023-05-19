import './css/Header.css'
import logoUjed from '../assets/img/ujed-logo.png'

function Header(props) {
    return(
        <header className="header">
            <section className="header__logo-container">
                <img className='header__logo-container__img' src={logoUjed} alt="Logo UJED" title='Logo UJED'/>
            </section>
            <section className='header__info'>
                <span className='header__info__name'>
                    {props.userName}
                </span>
            </section>
        </header>
    )
}

export default Header