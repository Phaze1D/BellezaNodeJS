import React from "react"
import { Link } from "react-router-dom"
import {dateOptions} from "utils/date"

class OrderItem extends React.PureComponent {
	render() {
		const {
			order,
			match
		} = this.props

		const detailList = order.get("details").map( (detail, index) =>
			<Detail key={index} detail={detail} />
		)

		return (
			<article className="box">
				<div className="grid order-item-top">
					<p className="overflow-text col-xxs-hide">
            Fecha Realizado
						<span>{new Date(order.get("created_at")).toLocaleString("en-us", dateOptions)}</span>
					</p>

					<p className="overflow-text col-xxs-hide">
            Total
						<span>${(order.get("total")/100).toFixed(2)}</span>
					</p>

					<p className="overflow-text">
            Status
						<span className={`status-${order.get("status")}`}>{order.get("status")}</span>
					</p>

					<p className="overflow-text">
            Referencia #{order.get("id")}
						<span>
							<Link to={`/user/${match.params.id}/order/${order.get("id")}`}>Detalles</Link>
						</span>
					</p>
				</div>

				{detailList}
			</article>
		)
	}
}

class Detail extends React.PureComponent {
	render() {
		const {
			detail
		} = this.props

		return (
			<div className="grid center">
				<img src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/xs/${detail.getIn(["product", "plu"])}.jpg`} className="col-2 col-xxs-3"/>
				<div className="grow col-xxs-9 order-item-info">
					<p style={{fontWeight: "bold", color: "black"}} className="overflow-text">{detail.get("name")}</p>
					<p className="sub-text overflow-text">Precio: ${(detail.get("price")/100).toFixed(2)} Cantidad: {detail.get("quantity")}</p>
					<p className="sub-text primary">${(detail.get("sub_total")/100).toFixed(2)}</p>
				</div>

				<Link to={`/product/${detail.get("product_id")}`} className="secondary-button raise col-xxs-hide">
					<span className="col-sm-hide">Comparar de Nuevo</span>
					<span className="col-hide col-sm-show">Comparar</span>
				</Link>
			</div>
		)
	}
}


export default OrderItem
