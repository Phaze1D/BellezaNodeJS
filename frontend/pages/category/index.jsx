import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


@connect( store => {
	return {
		categories: store.categories,
	}
})
export default class CategoryIndex extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		const {
			categories,
			match
		} = this.props

		let category = categories.get(match.params.index)
		if(!category) return (<Redirect to='/'/>)
		category = match.params.sub ? category.getIn(['subs', match.params.sub]) : category
		if(!category) return (<Redirect to='/'/>)

		let to = ''
		if(match.params.sub){
			to = `/categories/${match.params.index}/${match.params.sub}/`
		}else{
			to = `/categories/${match.params.index}/`
		}

		const sideList = category.get('subs').map( (sub, index) =>
			<li key={index}>
				<Link to={`${to}${index}`}>{sub.get('name')}</Link>
			</li>
		)

		const gridList = category.get('subs').map( (sub, index) =>
			<div className='col-4 col-sm-6 col-xxs-12' key={index}>
				<Link
					to={`${to}${index}`}
					className='category-item'
					style={{backgroundImage: `url(https://s3-us-west-1.amazonaws.com/belleza-node/categories/${sub.get('id')}.jpg)`}}>
					<h3 className='highlight'>{sub.get('name')}</h3>
				</Link>
			</div>
		)

		return (
			<main className='grid'>
				<section className='col-3 col-xs-hide'>
					<h3>{category.get('name')}</h3>
					<ul className='ul-dots'>
						{sideList}
					</ul>
				</section>

				<section className='col-9 col-xs-12'>
					<div
						className='category-cover'
						style={{backgroundImage: `url(https://s3-us-west-1.amazonaws.com/belleza-node/categories/${category.get('id')}.jpg)`}}>
						<h2>{category.get('name')}</h2>
					</div>

					<div className='grid-wrap'>
						{gridList}
					</div>

				</section>
			</main>
		)
	}
}
