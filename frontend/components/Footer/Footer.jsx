import React from 'react'
import { Link } from 'react-router-dom'
import { addMailer } from 'actions/others'
import { resetErrors } from 'actions/errors'

export default class Footer extends React.Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleError = this.handleError.bind(this)
	}

	handleSubmit(event){
		this.props.dispatch(resetErrors())
		event.preventDefault()
		let formData = new FormData()
		formData.append('email', event.target.elements.email.value)
		formData.append('active', true)

		this.props.dispatch(addMailer(formData, false))
			.then()
			.catch(this.handleError)
	}

	handleError(response){
		this.props.dispatch(resetErrors())
	}

	render(){

		return (
			<footer>
				<div id="footer-divider" className="grid center around cover-image"
					style={{backgroundImage: 'url(https://s3-us-west-1.amazonaws.com/belleza-node/web/footer.jpg)'}}>
					<h4 className="col-xs-hide grow">Registrate y reciba información, ofertas y tips directo a su correo</h4>
					<form onSubmit={this.handleSubmit}>
						<input type="submit" style={{display: 'none'}}/>
						<input type="text" name="email" placeholder="Email y Presione Entre"/>
					</form>
				</div>

				<div className="grid-wrap around" style={{margin: '0 16px'}}>
					<section className="col-4 col-sm-6 first-sm col-xs-12">
						<h3>Ubicaciones</h3>
						<a className="footer-address-title" href="#" title="Oficina Matriz">Oficina Matriz</a>
						<address>
							Rubén Darío 1208-PB 2b, Col. Providencia,<br/>
							Guadalajara Jalisco 44647<br/>
							México<br/>
							Tel. (33) 36420178 y 3640 3736 <br/>
						</address>
					</section>

					<section className="col-3 col-sm-12 last-sm col-xs-12">
						<h3>Acerca de</h3>
						<ul className="ul-dots">
							<li>
								<Link to="/quiensomos"> Quienes Somos</Link>
							</li>

							<li>
								<Link to="/history"> Historia</Link>
							</li>

							<li>
								<Link to="/nuestrapromesa"> Nuestras Promesas</Link>
							</li>

							<li>
								<Link to="/porqueorganico"> ¿Porqué Orgánico?</Link>
							</li>

							<li>
								<Link to="/awards"> Reconocimientos</Link>
							</li>

							<li>
								<Link to="/terminoscondiciones"> Términos y condiciones</Link>
							</li>

							{/*
      				<li>
      					<Link to="/contact"> Contacto</Link>
      				</li>
              */}

							<li>
								<a href="http://www.nealsyardremedies.com/store-finder#international" target="_blank">Tiendas Internacionales</a>
							</li>
						</ul>
					</section>

					<section className="col-4 col-sm-6 first-sm col-xs-12">
						<h3>Redes Sociales</h3>
						<ul className="grid center around footer-img-ul">
							<li className="col-2">
								<a href="https://www.facebook.com/BellezaOrganicaCertificada/" target="_blank" title="facebook page">
									<i className="fa fa-facebook-square" aria-hidden="true"></i>
								</a>
							</li>

							<li className="col-2">
								<a href="https://twitter.com/NealsYardMexico" target="_blank" title="twitter page">
									<i className="fa fa-twitter-square" aria-hidden="true"></i>
								</a>
							</li>

							<li className="col-2">
								<a href="https://www.instagram.com/nyr_mexico/" target="_blank" title="instagram page">
									<div className='instagram'>
									</div>
								</a>
							</li>
						</ul>

						<h3>Métodos de Pago</h3>
						<ul className="grid center around footer-img-ul" style={{marginTop: '0'}}>
							<li>
								<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-node/web/visa.png" alt="visa"/>
							</li>

							<li>
								<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-node/web/mastercard.png" alt="mastercard"/>
							</li>

							<li>
								<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-node/web/americanexpress.png" alt="americanexpress"/>
							</li>

							<li>
								<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-node/web/oxxo.png"  alt="oxxo"/>
							</li>

							<li>
								<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-node/web/bank.png" alt="bank transfer"/>
							</li>
						</ul>

						<h3>Seguridad</h3>
						<ul className="grid center around footer-img-ul" style={{marginTop: '0'}}>
							<li>
								<script type="text/javascript" src="https://seal.geotrust.com/getgeotrustsslseal?host_name=bellezaorganica.com.mx&amp;size=M&amp;lang=en"></script><br />
								<a href="http://www.geotrust.com/ssl/" target="_blank"  style={{color:'#000000', textDecoration:'none', font:'bold 7px verdana,sans-serif', letterSpacing:'.5px', textAlign:'center', margin:'0px', padding:0}}></a>
							</li>
						</ul>

					</section>
				</div>
			</footer>
		)
	}
}
