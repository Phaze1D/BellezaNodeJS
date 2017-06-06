import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'


export default class Carousel extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {
      banners
    } = this.props

    if(banners.get('rows').size == 0){
      return null
    }

    const carList = banners.get('rows').map( (img, index) =>
      <Link key={index} to={img.get('link_to')} className="carousel-item">
        <img className="carousel-img" src='http://placehold.it/540x300' alt=""/>
      </Link>
    )

    var settings = {
      dots: true,
      infinite: true,
      slidesToScroll: 1,
      draggable: false,
      autoplay: true,
      nextArrow: <NextArrow/>,
      prevArrow: <PreviousArrow/>,
    }

    return (
      <div className="carousel">
        <Slider {...settings}>
          {carList}
        </Slider>
      </div>
    )
  }
}

const NextArrow = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <i className="material-icons">keyboard_arrow_right</i>
    </button>
  )
}

const PreviousArrow = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <i className="material-icons">keyboard_arrow_left</i>
    </button>
  )
}
