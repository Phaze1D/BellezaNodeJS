import React from 'react'

export default class Stores extends React.Component {

	componentDidMount() {
		if(window.google){
			loadGDL()
			loadMX1()
			loadMX2()
		}
	}

	componentWillUnmount() {

	}

	render () {
		return (
			<main>
				<div className='grid-wrap center around'>
					<h2 className='col-12 h-underline'>
            Guadalajara <span className='sub-text' style={{fontSize: '0.6em'}}> Oficina Matriz </span>
					</h2>
					<div className='col-6 col-xs-9 col-xxs-12'>
						<div className='map-img contain-image' style={{backgroundImage: 'url(https://s3-us-west-1.amazonaws.com/belleza-node/web/office.jpg)'}}></div>
					</div>

					<div className='col-6 col-xs-9 col-xxs-12'>
						<div id='guad-map' className='map-div'></div>
					</div>

					<h2 className='col-12 h-underline'>México DF</h2>
					<div className='col-6 col-xs-9 col-xxs-12'>
						<div className='map-img contain-image' style={{backgroundImage: 'url(https://s3-us-west-1.amazonaws.com/belleza-node/web/office2.jpg)'}}></div>
					</div>

					<div className='col-6 col-xs-9 col-xxs-12'>
						<div id='df1-map' className='map-div'></div>
					</div>
					<div className='col-6 col-xs-9 col-xxs-12'>
						<div className='map-img contain-image' style={{backgroundImage: 'url(https://s3-us-west-1.amazonaws.com/belleza-node/web/office1.jpg)'}}></div>
					</div>

					<div className='col-6 col-xs-9 col-xxs-12'>
						<div id='df2-map' className='map-div'></div>
					</div>
				</div>

			</main>
		)
	}
}


const InfoWindow = () => {
	return `
  <address class="info-window">
    <p>Ruben Dario 1208</p>
    <p>Planta Baja, Providencia 2a. Secc</p>
    <p>44647, Jalisco, Guadalajara </p>
    <p>México</p>
    <p>Tel. (33) 36420178 y 3640 3736</p>
  </address>
  `
}

const InfoWindow1 = () => {
	return `
  <address class="info-window">
    <p>Ejericito Nacional #769 Esq Moliere</p>
    <p>Polanco</p>
    <p>Granada</p>
    <p>11520 Ciudad de México, CDMX</p>
    <p>México</p>
    <p>Tel. 01 55 5902 4720</p>
  </address>
  `
}

const InfoWindow2 = () => {
	return `
  <address class="info-window">
    <p>Avenida Universidad</p>
    <p>Xoco</p>
    <p>Benito Juárez</p>
    <p>03330, Ciudad de México</p>
    <p>México</p>
    <p>Tel. 044 55 2961 8419</p>
  </address>
  `
}



const loadGDL = function() {
	let uluru = {lat: 20.6948516, lng: -103.3833014}
	let map = new window.google.maps.Map(document.getElementById('guad-map'), {
		zoom: 17,
		center: uluru
	})

	var service = new window.google.maps.places.PlacesService(map)
	service.getDetails({
		placeId: 'ChIJm7bUC0euKIQR16nDKgEc0cY'
	}, function (result, status) {
		map.setCenter(result.geometry.location)

		var marker = new window.google.maps.Marker({
			map: map,
			place: {
				placeId: 'ChIJm7bUC0euKIQR16nDKgEc0cY',
				location: result.geometry.location
			}
		})

		let infowindow = new window.google.maps.InfoWindow({
			content: InfoWindow()
		})

		infowindow.open(map, marker)

		marker.addListener('click', function() {
			infowindow.open(map, marker)
		})
	})
}


const loadMX1 = function() {
	let uluru = {lat: 19.4393079, lng: -99.2013657}
	let map = new window.google.maps.Map(document.getElementById('df1-map'), {
		zoom: 17,
		center: uluru
	})

	var service = new window.google.maps.places.PlacesService(map)
	service.getDetails({
		placeId: 'ChIJTykh1wQC0oURYjASDwnHhOE'
	}, function (result, status) {
		map.setCenter(result.geometry.location)

		var marker = new window.google.maps.Marker({
			map: map,
			place: {
				placeId: 'ChIJTykh1wQC0oURYjASDwnHhOE',
				location: result.geometry.location
			}
		})

		let infowindow = new window.google.maps.InfoWindow({
			content: InfoWindow1()
		})

		infowindow.open(map, marker)

		marker.addListener('click', function() {
			infowindow.open(map, marker)
		})
	})
}

const loadMX2 = function() {
	let uluru = {lat: 19.3652849, lng: -99.1681033}
	let map = new window.google.maps.Map(document.getElementById('df2-map'), {
		zoom: 17,
		center: uluru
	})

	var service = new window.google.maps.places.PlacesService(map)
	service.getDetails({
		placeId: 'ChIJVfqyHL7_0YURIG1KQZ7aMxA'
	}, function (result, status) {
		map.setCenter(result.geometry.location)

		var marker = new window.google.maps.Marker({
			map: map,
			place: {
				placeId: 'ChIJVfqyHL7_0YURIG1KQZ7aMxA',
				location: result.geometry.location
			}
		})

		let infowindow = new window.google.maps.InfoWindow({
			content: InfoWindow2()
		})

		infowindow.open(map, marker)

		marker.addListener('click', function() {
			infowindow.open(map, marker)
		})
	})
}
