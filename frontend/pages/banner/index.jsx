import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Pagination from 'components/Pagination/Pagination'
import { dateOptions } from 'utils/date'
import queryString from 'query-string'
import { getBanners, resetBanners, deleteBanner } from 'actions/others'
import Loader from 'components/Loader/Loader'



@connect(store => {
	return {
		banners: store.others.get('banners'),
		user: store.user
	}
})
class BannersIndex extends React.Component {
	constructor(props){
		super(props)
		this.state = {page: 0, prePage: 20}

		this.handleUrlChanged = this.handleUrlChanged.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.handleError = this.handleError.bind(this)
		this.unlisten = null
	}

	componentDidMount() {
		this.handleUrlChanged(this.props.history.location)
		this.unlisten = this.props.history.listen(this.handleUrlChanged)
	}

	componentWillUnmount() {
		this.unlisten()
		this.props.dispatch(resetBanners())
	}

	handleUrlChanged(location) {
		if(this.props.match.url === location.pathname){
			const parse = queryString.parse(location.search)

			this.props.dispatch(getBanners(parse.page, this.props.user.get('token')))
				.then()
				.catch(this.handleError)
		}
	}

	handlePageClick(index, event){
		this.setState({page: index})
	}

	handleDelete(id, event){
		event.preventDefault()
		this.props.dispatch(deleteBanner(id, this.props.user.get('token')))
			.then( () => {
				this.handleUrlChanged(this.props.history.location)
			})
			.catch(this.handleError)
	}

	handleError(response) {

	}

	render () {
		const {
			banners,
			match,
		} = this.props

		const bannerList = banners.get('rows').map( (banner) =>
			<BannerItem
				key={banner.get('id')}
				banner={banner}
				onRequestDelete={this.handleDelete.bind(this, banner.get('id'))}/>
		)

		const links = []
		for(let i = 0; i < Math.ceil(banners.get('count')/this.state.prePage); i++ ){
			links.push({value: `${match.url}?page=${i}`, name: i+1})
		}

		return (
			<div>
				<div className="protop">
					<Link to ="/backoffice/banner/new" className="secondary-button">Add Banner</Link>
				</div>

				<Loader>
					<table className="backoffice-table">
						<thead>
							<tr>
								<th>Image</th>
								<th>Link To</th>
								<th>Active</th>
								<th>Start Date</th>
								<th>End Date</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>

						<tbody>
							{bannerList}
						</tbody>

						<tfoot>
							<tr>
								<td colSpan="7">
									<Pagination
										links={links}
										page={this.state.page}
										onRequestClick={this.handlePageClick}/>
								</td>
							</tr>
						</tfoot>
					</table>
				</Loader>
			</div>
		)
	}
}

export default BannersIndex


const BannerItem = props => (
	<tr>
		<td>
			<img className="banner-sm" src={`https://s3-us-west-1.amazonaws.com/belleza-node/banners/${props.banner.get('id')}_lg.jpg`}/>
		</td>
		<td>
			<Link to={props.banner.get('link_to')}>Link</Link>
		</td>
		<td>{props.banner.get('manual_active') ? 'Yes': 'No'}</td>
		<td>{new Date(props.banner.get('start_date')).toLocaleString('en-us', dateOptions)}</td>
		<td>{new Date(props.banner.get('end_date')).toLocaleString('en-us', dateOptions)}</td>
		<td>
			<Link to={`/backoffice/banner/${props.banner.get('id')}/edit`}>Update</Link>
		</td>

		<td>
			<Link to='#' onClick={props.onRequestDelete}>Delete</Link>
		</td>
	</tr>
)
