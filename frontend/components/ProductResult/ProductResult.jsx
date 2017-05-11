import React from 'react'
import { Link } from 'react-router-dom'


export default class ProductResult extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <article className="col-3 product-cell">
        <Link to={this.props.url}>
          <img src={this.props.image} alt={this.props.name}/>
          <h4 className="overflow-text">{this.props.name}</h4>
          <p>${this.props.price}</p>
        </Link>

        <form>
          <input className="secondary-button" type="submit" value="Agregar al Carrito"/>
          <input name="quantity" type="number" min="0" max="10" defaultValue="1"/>
        </form>
      </article>
    )
  }
}
