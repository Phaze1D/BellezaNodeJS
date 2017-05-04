import React from 'react'


export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){

    return (
      <footer className="footer__wrapper">
        <div className="footer__divider" style={{backgroundImage: 'url(http://placehold.it/1200x128)'}}>
          <h4>Registrate y reciba información, ofertas y tips directo a su correo</h4>
          <form>
            <input className="input" type="text" placeholder="Email y Presione Entre"/>
          </form>
        </div>

        <div className="footer__grid">
          <section className="footer__section">
            <h4>Ubicaciones</h4>
            <a className="footer__sub-title" href="#" title="Oficina Matriz">Oficina Matriz</a>
            <p className="footer__info">
  						Rubén Darío 1208-PB 2b, Col. Providencia,<br/>
  						Guadalajara Jalisco 44647<br/>
  						México<br/>
  						Tel. (33) 36420178 y 3640 3736 <br/>
  					</p>

            <a className="footer__sub-title" href="#" title="Oficina Ciudad de México">Ciudad de México</a>
            <p className="footer__info">
  						Rubén Darío 1208-PB 2b, Col. Providencia,<br/>
  						Guadalajara Jalisco 44647<br/>
  						México<br/>
  						Tel. (33) 36420178 y 3640 3736 <br/>
  					</p>
          </section>

          <section className="footer__section">
            <h4>Acerca de</h4>
            <ul className="footer__ul">
      				<li>
      					<a  href="https://bellezaorganica.com.mx/quienSomos"> Quienes Somos</a>
      				</li>

      				<li>
      					<a  href="https://bellezaorganica.com.mx/history"> Historia</a>
      				</li>

      				<li>
      					<a href="https://bellezaorganica.com.mx/nuestraPromesa"> Nuestras Promesas</a>
      				</li>

      				<li>
      					<a href="https://bellezaorganica.com.mx/porqueOrganico"> ¿Porqué Orgánico?</a>
      				</li>

      				<li>
      					<a href="https://bellezaorganica.com.mx/reconocimiento"> Reconocimientos</a>
      				</li>

      				<li>
      					<a href="https://bellezaorganica.com.mx/terminosCondiciones"> Términos y condiciones</a>
      				</li>

      				<li>
      					<a href="https://bellezaorganica.com.mx/contacto"> Contacto</a>
      				</li>

              <li>
      					<a href="#">Tiendas Internacionales</a>
      				</li>
      			</ul>
          </section>

          <section className="footer__section">
            <h4>Redes Sociales</h4>
            <ul className="social-ul">
              <li>
                <a href="#" target="_blank" title="facebook page">
                  <i className="fa fa-facebook-square" aria-hidden="true"></i>
                </a>
              </li>

              <li>
                <a href="#" target="_blank" title="twitter page">
                  <i className="fa fa-twitter-square" aria-hidden="true"></i>
                </a>
              </li>

              <li>
                <a href="#" target="_blank" title="instagram page">
                  <div className='instagram'>
                  </div>
                </a>
              </li>
            </ul>

            <h4>Métodos de Pago</h4>
            <ul className="social-ul">
              <li>
                <img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/visa.png" alt="visa"/>
              </li>

              <li>
                <img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/mastercard.png" alt="mastercard"/>
              </li>

              <li>
                <img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/americanexpress.png" alt="americanexpress"/>
              </li>

              <li>
                <img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/oxxo.png"  alt="oxxo"/>
              </li>

              <li>
                <img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/bank.png" alt="bank transfer"/>
              </li>
            </ul>

            <h4>Seguridad</h4>

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
