import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { ArrowLeft, ArrowRight } from 'components/SVGIcons/Material'


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

		const carList = banners.get('rows').map( (banner, index) =>
			<Link key={index} to={banner.get('link_to')} className="carousel-item">
				<picture>
					<source
						srcSet={`https://s3-us-west-1.amazonaws.com/belleza-node/banners/${banner.get('id')}_sm.jpg`}
						media="(max-width: 463px)"/>
					<img className="carousel-img"
						src={`https://s3-us-west-1.amazonaws.com/belleza-node/banners/${banner.get('id')}_lg.jpg`}
						alt="Banner Image"/>
				</picture>
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
			<div id="banners" className="carousel">
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
