import React from 'react'
import { Link } from 'react-router-dom'


export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){

    return (
      <footer>
        <div id="footer-divider" className="grid center between cover-image" style={{backgroundImage: 'url(http://placehold.it/1200x128)'}}>
          <h4>Registrate y reciba información, ofertas y tips directo a su correo</h4>
          <form>
            <input type="text" placeholder="Email y Presione Entre"/>
          </form>
        </div>

        <div className="grid around" style={{margin: '0 16px'}}>
          <section className="col-4">
            <h3>Ubicaciones</h3>
            <a className="footer-address-title" href="#" title="Oficina Matriz">Oficina Matriz</a>
            <address>
  						Rubén Darío 1208-PB 2b, Col. Providencia,<br/>
  						Guadalajara Jalisco 44647<br/>
  						México<br/>
  						Tel. (33) 36420178 y 3640 3736 <br/>
  					</address>

            <a className="footer-address-title" href="#" title="Oficina Ciudad de México">Ciudad de México</a>
            <address>
  						Rubén Darío 1208-PB 2b, Col. Providencia,<br/>
  						Guadalajara Jalisco 44647<br/>
  						México<br/>
  						Tel. (33) 36420178 y 3640 3736 <br/>
  					</address>
          </section>

          <section className="col-3">
            <h3>Acerca de</h3>
            <ul className="ul-dots">
      				<li>
      					<Link to="/quienSomos"> Quienes Somos</Link>
      				</li>

      				<li>
      					<Link to="/history"> Historia</Link>
      				</li>

      				<li>
      					<Link to="/nuestraPromesa"> Nuestras Promesas</Link>
      				</li>

      				<li>
      					<Link to="porqueOrganico"> ¿Porqué Orgánico?</Link>
      				</li>

      				<li>
      					<Link to="/awards"> Reconocimientos</Link>
      				</li>

      				<li>
      					<Link to="/terminosCondiciones"> Términos y condiciones</Link>
      				</li>

      				<li>
      					<Link to="/contact"> Contacto</Link>
      				</li>

              <li>
      					<a href="http://www.nealsyardremedies.com/store-finder#international" target="_blank">Tiendas Internacionales</a>
      				</li>
      			</ul>
          </section>

          <section className="col-4">
            <h3>Redes Sociales</h3>
            <ul className="grid center footer-img-ul">
              <li className="col-2">
                <a href="#" target="_blank" title="facebook page">
                  <i className="fa fa-facebook-square" aria-hidden="true"></i>
                </a>
              </li>

              <li className="col-2">
                <a href="#" target="_blank" title="twitter page">
                  <i className="fa fa-twitter-square" aria-hidden="true"></i>
                </a>
              </li>

              <li className="col-2">
                <a href="#" target="_blank" title="instagram page">
                  <div className='instagram'>
                  </div>
                </a>
              </li>
            </ul>

            <h3>Métodos de Pago</h3>
            <ul className="grid center">
              <li>
                <img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/visa.png" alt="visa"/>
              </li>

              <li>
                <img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/mastercard.png" alt="mastercard"/>
              </li>

              <li>
                <img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/americanexpress.png" alt="americanexpress"/>
              </li>

              <li>
                <img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/oxxo.png"  alt="oxxo"/>
              </li>

              <li>
                <img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/bank.png" alt="bank transfer"/>
              </li>
            </ul>

            <h3>Seguridad</h3>

          </section>
        </div>
      </footer>
    )
  }
}


// <table width="135" border="0" cellpadding="2" cellspacing="0" title="Click to Verify - This site chose GeoTrust SSL for secure e-commerce and confidential communications.">
// <tr>
// <td width="135" align="center" valign="top"><script type="text/javascript" src="https://seal.geotrust.com/getgeotrustsslseal?host_name=bellezaorganica.com.mx&amp;size=M&amp;lang=en"></script><br />
// <a href="http://www.geotrust.com/ssl/" target="_blank"  style="color:#000000; text-decoration:none; font:bold 7px verdana,sans-serif; letter-spacing:.5px; text-align:center; margin:0px; padding:0px;"></a></td>
// </tr>
// </table>
