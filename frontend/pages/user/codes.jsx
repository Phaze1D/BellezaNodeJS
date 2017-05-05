import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import {codes} from '../../../fake'

const actives = codes()
const deactives = codes()

export default class UserCodes extends React.Component {
  render () {

    const aList = actives.map( (code, index) =>
      <CodeItem key={index} {...code}/>
    )

    const dList = deactives.map( (code, index) =>
      <CodeItem key={index} {...code}/>
    )

    return (
      <section className="user__section smooth">
        <h2>
          Mis Códigos de Descuento
          <Link to="#">Salir</Link>
        </h2>

        <div className="codes__wrapper ">

          {actives.length > 0 &&
            <article className="active">
              <div className="codes__top">Activados</div>
              {aList}
            </article>
          }

          {deactives.length > 0 &&
            <article className="deactive">
              <div className="codes__top">Desactivados</div>
              {dList}
            </article>
          }

          {actives.length == 0 && deactives.length == 0 &&
            <h4 className="empty-state">Cero Códigos Encontrados</h4>
          }

        </div>

      </section>
    )
  }
}

const CodeItem = props => (
  <div className="codes__item">
    <p>Codigo: <span>{props.code}</span></p>
    <p>Descuento: <span>{props.discount}</span></p>
    <p>Fecha de Caducidad: <span>{moment(props.expire).format('MMM DD, YYYY')}</span></p>
  </div>
)
