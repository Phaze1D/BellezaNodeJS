import React from 'react'
import { Link } from 'react-router-dom'
import CartBox from 'components/CartBox/CartBox'

import {categories} from '../../../fake'
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
      <li
        key={category.id}
        className="nav-item"
        onClick={this.handleNavClick}
        onMouseLeave={this.handleNavLeave}>

        <Link to="/categories" title={category.name} className="nav-link">{category.name}</Link>
        <MainList mains={category.mains}/>
      </li>
    )

    return (
      <header>
        <div className="grid center">
          <Link className="grid center col-8" to="/home" title="Neals Yard Remedies Mexico">
            <img id="logo-img" src="http://placehold.it/200" alt="logo"/>

            <h1 id="web-title">
              Neal's Yard Remedies México
              <span>  Salud y Belleza Orgánica </span>
            </h1>
          </Link>


          <div className="col-4">
            <div className="grid center end">
              <Link className="dark-a header-link" to="/user/details" title="Tiendas">Tiendas</Link>
              <hr className="vertical-hr"></hr>
              <Link className="dark-a header-link" to="/signin" title="Signin">Mi Cuenta</Link>
              <hr className="vertical-hr"></hr>
              <div id="cart-link" className="header-link">
                <Link className="dark-a grid center" to="/cart">
                  Carrito
                  <i className="material-icons">shopping_cart</i>
                </Link>
                <CartBox/>
              </div>
            </div>

            <form id="search-form" className="grid center">
              <input type="search" name="search"/>
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </form>
          </div>

        </div>

        <nav>
          <ul id="nav-ul" className="grid">
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
      <li key={sub.id} title={sub.name}>
        <Link to="/category" className="sub-text">
          {sub.name}
        </Link>
      </li>
    )

    return (
      <ul key={main.id} className="main-item">
        <Link to="#" title={main.name} className="dark-a">{main.name}</Link>
        {subList}
      </ul>
    )
  })


  return (
    <div className="nav-menu-box">
      {mainList}
    </div>
  )
}
