import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { ArrowLeft, ArrowRight } from 'components/SVGIcons/Material'



export default class Favorites extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {
      products
    } = this.props

    const settings = {
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 5,
      swipeToSlide: true,
      dots: false,
      nextArrow: <NextArrow/>,
      prevArrow: <PreviousArrow/>,
      responsive: [{
        breakpoint: 1012,
        settings: {
          slidesToShow: 4,
        }
      },{
        breakpoint: 828,
        settings: {
          slidesToShow: 3,
        }
      },{
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },{
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        }
      }]
    };

    if(products.get('rows').size == 0){
      return null
    }
    const favList = products.get('rows').map( (product, index) =>
      <div key={index} className="fav-item" draggable="false">
        <Link to={`/product/${product.get('id')}`} draggable="false">
          <img src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/xxs/${product.get('plu')}.jpg`} alt={product.get('name')} draggable="false"/>
          <p className="overflow-text">{product.get('name')}</p>
        </Link>
      </div>
    )

    return (
      <div id="favorites" className="fav-wrapper">
        <Slider {...settings}>
          {favList}
        </Slider>
      </div>
    )
  }
}


const NextArrow = (props) => {
  return (
    <button className="fav-arrow" onClick={props.onClick} className={props.className}>
      <ArrowRight/>
    </button>
  )
}

const PreviousArrow = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <ArrowLeft/>
    </button>
  )
}
