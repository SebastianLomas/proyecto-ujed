import { MdExitToApp } from 'react-icons/md'

import './css/Header.css'
import logoUjed from '../assets/img/ujed-logo-2.jpeg'
import { useRef } from 'react'

function Header(props) {
    const showMenu = useRef(false)
    function menuShowHandler(ev) {
        ev.stopPropagation()
        const element = document.getElementsByClassName("header__info__menu")

        if(!showMenu.current) {
            element[0].style.display = "flex"
            showMenu.current = true
        } else {
            element[0].style.display = "none"
            showMenu.current = false
        }
    }

    return(
        <header className="header">
            <section className="header__logo-container">
                <img className='header__logo-container__img' src={logoUjed} alt="Logo UJED" title='Logo UJED'/>
            </section>
            <section className='header__info' onClick={menuShowHandler}>
                <picture className='header__info__pic'>
                    <img src={props.profilePicUrl} alt={`Foto de Perfil de ${props.userName}`} referrerPolicy='no-referrer'/>
                </picture>
                <span className='header__info__name'>
                    {props.userName.toLowerCase()}
                </span>
                <section className='header__info__menu' onClick={props.logOut}>
                    <MdExitToApp className='header__info__menu-icon'/>
                    <span>cerrar sesion</span>
                </section>
            </section>
        </header>
    )
}

export default Header