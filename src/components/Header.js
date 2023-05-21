import './css/Header.css'
import logoUjed from '../assets/img/ujed-logo-2.jpeg'
import { useState } from 'react'

function Header(props) {
    return(
        <header className="header">
            <section className="header__logo-container">
                <img className='header__logo-container__img' src={logoUjed} alt="Logo UJED" title='Logo UJED'/>
            </section>
            <section className='header__info'>
                <picture className='header__info__pic'>
                    <img src={props.profilePicUrl} alt={`Foto de Perfil de ${props.userName}`}/>
                </picture>
                <span className='header__info__name'>
                    {props.userName.toLowerCase()}
                </span>
            </section>
        </header>
    )
}

export default Header