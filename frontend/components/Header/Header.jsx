import React from 'react'
import { Link } from 'react-router-dom'
import CartBox from 'components/CartBox/CartBox'
import classnames from 'classnames'

import {categories} from '../../../fake'
const cats = categories()

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggleSide = this.handleToggleSide.bind(this)
    this.handleNavClick = this.handleNavClick.bind(this)
  }

  handleNavClick(event) {
    if(event.target.tagName === "A"){
      event.currentTarget.classList.add("hide")
      this.refs.overlay.classList.toggle('show')
      this.refs.side.classList.toggle('show')
    }
  }

  handleNavLeave(event) {
    if(event.currentTarget.classList.contains("hide")){
      event.currentTarget.classList.remove("hide")
    }
  }

  handleToggleSide(event) {
    this.refs.overlay.classList.toggle('show')
    this.refs.side.classList.toggle('show')
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
          <Link className="grid center overflow-text col-8 col-sm-11" to="/home" title="Neals Yard Remedies Mexico">
            <img id="logo-img" src="http://placehold.it/200" alt="logo"/>

            <h1 id="web-title" className="overflow-text">
              Neal's Yard Remedies México
              <span>  Salud y Belleza Orgánica </span>
            </h1>
          </Link>

          <button id="menu-button" className="col-hide col-sm-show" onClick={this.handleToggleSide}>
            <i className="material-icons">menu</i>
          </button>

          <div className="col-4 col-sm-hide">
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

            <form className="search-form grid center">
              <input type="search" name="search"/>
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </form>
          </div>
        </div>

        <div
          ref="overlay"
          className="overlay col-sm-show col-hide"
          onClick={this.handleToggleSide}></div>

        <nav>
          <ul ref="side" id="nav-ul" className="grid">

            <li className="nav-item col-sm-show col-hide">
              <Link to="/signin" className="nav-link" onClick={this.handleToggleSide}>Mi Cuenta</Link>
            </li>
            <li className="nav-item col-sm-show col-hide">
              <Link className="dark-a grid center" to="/cart" onClick={this.handleToggleSide}>
                <span className="grow">
                  Carrito
                </span>
                <i className="material-icons">shopping_cart</i>
              </Link>
            </li>
            <li className="nav-item col-sm-show col-hide">
              <Link to="/user/details" className="nav-link" onClick={this.handleToggleSide}>Tiendas</Link>
            </li>

            <li className="nav-item col-sm-show col-hide">
              <form className="search-form grid center">
                <input type="search" name="search"/>
                <button type="submit">
                  <i className="material-icons">search</i>
                </button>
              </form>
            </li>

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
