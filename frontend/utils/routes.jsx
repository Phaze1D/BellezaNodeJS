import React from 'react'
import { BrowserRouter, Route, StaticRouter } from 'react-router-dom'
import Layout from 'components/Layout/Layout'


export const Routes = () => (
	<BrowserRouter>
		<Route path="/" component={Layout}/>
	</BrowserRouter>
)

export const ServerRoutes = (props) => (
	<StaticRouter location={props.url} context={{}}>
		<Route path="/" component={Layout}/>
	</StaticRouter>
)
