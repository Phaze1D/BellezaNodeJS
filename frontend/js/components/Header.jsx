import React from 'react'
import { Link } from 'react-router-dom'
import {categories} from '../../../fake.js'

const cats = categories()

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  handleNavClick(event) {
    if(event.target.tagName === "A"){
      event.currentTarget.classList.add("hide")
    }
  }

  handleNavLeave(event) {
    if(event.currentTarget.classList.contains("hide")){
      event.currentTarget.classList.remove("hide")
    }
  }

  render() {

    const navList = cats.map( (category) =>
      <li className="header__list-item" key={category.id} onClick={this.handleNavClick} onMouseLeave={this.handleNavLeave}>
        <Link to="/categories" className="nav-a">{category.name}</Link>
        <MainList mains={category.mains}/>
      </li>
    )

    return (
      <header>
        <div className="header__upper">
          <Link to="/home" className="header__home">
            <img className="header__logo" src="http://placehold.it/200" alt="logo"/>

            <h1 className="header__title">
              Neal's Yard Remedies México
              <span className="header__sub-title">  Salud y Belleza Orgánica </span>
            </h1>
          </Link>


          <div className="header__form">
            <div className="header__links">
              <Link to="#">Tiendas</Link>
              <div className="vertical-divider"></div>
              <Link to="#">Mi Cuenta</Link>
              <div className="vertical-divider"></div>
              <Link to="#" className="cart-link">
                Carrito
                <i className="material-icons">shopping_cart</i>
              </Link>
            </div>

            <form id="search-form">
              <input type="search"/>
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </form>
          </div>
        </div>

        <nav>
          <ul className="header__nav">
            {navList}
          </ul>
        </nav>
      </header>
    )
  }
}


const MainList = (props) => {

  const mainList = props.mains.map( (main) => {

    const subList = main.subs.map( (sub) =>
      <li className="sub-item" key={sub.id}>
        <Link to="#">
          {sub.name}
        </Link>
      </li>
    )

    return (
      <ul className="main-item" key={main.id}>
        <Link to="#" className="main-title">{main.name}</Link>
        {subList}
      </ul>
    )
  })


  return (
    <div className='nav-menu-box'>
      {mainList}
    </div>
  )
}
