import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import CartBox from 'components/CartBox/CartBox'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getCategories } from 'actions/category'
import { hideCart } from 'actions/cart'


/**
* LOCAL - GET
* @param {object} cart - The Object the represent the current order (shopping cart)
*
* HTTP - GET
* @param {array} categories - An array of all the categories
*/

@connect( store => {
  return {
    categories: store.categories,
    cart: store.cart
  }
})
export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showCart: false}

    this.handleToggleSide = this.handleToggleSide.bind(this)
    this.handleNavClick = this.handleNavClick.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getCategories())
    .then()
    .catch(this.handleError)
  }

  componentWillUpdate(nextProps, nextState) {
    if( nextProps.cart.get('show') && !this.props.cart.get('show') ) {
      setTimeout( () => {
        document.body.style.overflow = ""
        this.props.dispatch(hideCart())
      }, 2000)
    }
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

  handleSearchSubmit(event) {
    event.preventDefault()
    let input = event.target.elements['query']
    this.props.history.push({
      pathname: '/search',
      search: `?q=${input.value}&page=0&sort=0`
    })
    input.value = ''
  }

  handleError(response) {

  }

  render() {
    const {
      categories,
      cart
    } = this.props

    const showC = this.state.showCart || cart.get('show')

    const navList = categories.map( (category, index) =>
      <li
        key={category.get('id')}
        className="nav-item"
        onClick={this.handleNavClick}
        onMouseLeave={this.handleNavLeave}>

        <Link to={`/categories/${index}`} title={category.get('name')} className="nav-link">{category.get('name')}</Link>
        <MainList subs={category.get('subs')} index={index}/>
      </li>
    )

    return (
      <header>
        <CartBox
          cart={cart}
          show={showC}
          onRequestMouseLeave={(event) => {this.setState({showCart: false})} }/>

        <div className="grid center">
          <Link className="grid center overflow-text col-8 col-sm-11" to="/home" title="Neals Yard Remedies Mexico">
            <img id="logo-img" src="https://s3-us-west-1.amazonaws.com/belleza-node/web/nyr_logo.jpg" alt="logo"/>

            <div id="web-title-div" className="overflow-text">
              <h1 id="web-title">
                Neal's Yard Remedies México
              </h1>
              <h2 id="web-title-h2"> Salud y Belleza Orgánica</h2>
            </div>
          </Link>

          <button id="menu-button" className="col-hide col-sm-show" onClick={this.handleToggleSide}>
            <i className="material-icons">menu</i>
          </button>

          <div className="col-4 col-sm-hide">
            <div className="grid center end">
              <Link className="dark-a header-link" to="/stores" title="Tiendas">Tiendas</Link>
              <hr className="vertical-hr"></hr>
              <Link className="dark-a header-link" to="/signin" title="Signin">Mi Cuenta</Link>
              <hr className="vertical-hr"></hr>
              <div
                id="cart-link"
                className="header-link"
                onMouseEnter={(event) => {this.setState({showCart: true})} }>
                <Link className="dark-a grid center" to="/cart">
                  Carrito
                  <i className="material-icons">shopping_cart</i>
                </Link>
              </div>
            </div>

            <form className="search-form grid center" onSubmit={this.handleSearchSubmit}>
              <input type="search" name="query" autoComplete="off"/>
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
              <Link to="/stores" className="nav-link" onClick={this.handleToggleSide}>Tiendas</Link>
            </li>

            <li className="nav-item col-sm-show col-hide">
              <form className="search-form grid center" onSubmit={this.handleSearchSubmit}>
                <input type="search" name="query" autoComplete="off"/>
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

  const mainList = props.subs.map( (main, mindex) => {

    const subList = main.get('subs').map( (sub, sindex) =>
      <li key={sub.get('id')} title={sub.get('name')}>
        <Link to={`/categories/${props.index}/${mindex}/${sindex}`} className="sub-text">
          {sub.get('name')}
        </Link>
      </li>
    )

    return (
      <ul key={main.get('id')} className="main-item">
        <Link to={`/categories/${props.index}/${mindex}`} title={main.get('name')} className="dark-a">{main.get('name')}</Link>
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
