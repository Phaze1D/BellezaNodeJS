import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'


const imgs = [
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name'},
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name Really Long Product Name That Should Fill The How Page'},
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name'},
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name'},
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name'},
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name'},
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name'},
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name'},
  {src: 'http://placehold.it/200x125', to: '#', name: 'Product Name'}
]


export default class Favorites extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    const settings = {
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 5,
      swipeToSlide: true,
      dots: false,
      nextArrow: <NextArrow/>,
      prevArrow: <PreviousArrow/>,
    };

    const favList = imgs.map( (item, index) =>
      <div key={index} className="fav__item" draggable="false">
        <Link to={item.to} draggable="false">
          <img src={item.src} alt={item.name} draggable="false"/>
          <p className="overflow-text">{item.name}</p>
        </Link>
      </div>
    )

    return (
      <div className="fav__wrapper">
        <Slider {...settings}>
          {favList}
        </Slider>
      </div>
    )
  }
}


const NextArrow = (props) => {
  return (
    <button className="fav__arrow" onClick={props.onClick} className={props.className}>
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
