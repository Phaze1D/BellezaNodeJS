import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const imgs = [
  {src: 'http://placehold.it/1200x400', to: '#'},
  {src: 'http://placehold.it/1200x400', to: '#'},
  {src: 'http://placehold.it/1200x400', to: '#'},
  {src: 'http://placehold.it/1200x400', to: '#'},
  {src: 'http://placehold.it/1200x400', to: '#'}
]

export default class Carousel extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    const carList = imgs.map( (img, index) =>
    <Link key={index} to={img.to} className="carousel-item">
      <img className="carousel-img" src={img.src} alt=""/>
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
