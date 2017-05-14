import React, { PropTypes } from 'react'

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
        <div className="grid-wrap center around">
          <h2 className="col-12 h-underline">
            Guadalajara <span className="sub-text" style={{fontSize: '0.6em'}}> Oficina Matriz </span>
          </h2>
          <div className="col-6 col-xs-9 col-xxs-12">
            <div className="map-img cover-image" style={{backgroundImage: 'url(http://placehold.it/400x250)'}}></div>
          </div>

          <div className="col-6 col-xs-9 col-xxs-12">
            <div id="guad-map" className="map-div"></div>
          </div>

          <h2 className="col-12 h-underline">México DF</h2>
          <div className="col-6 col-xs-9 col-xxs-12">
            <div className="map-img cover-image" style={{backgroundImage: 'url(http://placehold.it/400x250)'}}></div>
          </div>

          <div className="col-6 col-xs-9 col-xxs-12">
            <div id="df1-map" className="map-div"></div>
          </div>
          <div className="col-6 col-xs-9 col-xxs-12">
            <div className="map-img cover-image" style={{backgroundImage: 'url(http://placehold.it/400x250)'}}></div>
          </div>

          <div className="col-6 col-xs-9 col-xxs-12">
            <div id="df2-map" className="map-div"></div>
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



const loadGDL = function() {
  let infowindow = new google.maps.InfoWindow({
    content: InfoWindow()
  });

  let uluru = {lat: 20.6948516, lng: -103.3833014};
  let map = new google.maps.Map(document.getElementById('guad-map'), {
    zoom: 17,
    center: uluru
  });

  let marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}


const loadMX1 = function() {
  let infowindow = new google.maps.InfoWindow({
    content: InfoWindow()
  });

  let uluru = {lat: 20.6948516, lng: -103.3833014};
  let map = new google.maps.Map(document.getElementById('df1-map'), {
    zoom: 17,
    center: uluru
  });

  let marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  infowindow.open(map, marker);

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

const loadMX2 = function() {
  let infowindow = new google.maps.InfoWindow({
    content: InfoWindow()
  });

  let uluru = {lat: 20.6948516, lng: -103.3833014};
  let map = new google.maps.Map(document.getElementById('df2-map'), {
    zoom: 17,
    center: uluru
  });

  let marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
