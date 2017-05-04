import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from 'components/Layout/Layout'


export const Routes = () => (
  <BrowserRouter>
    <Route path="/" component={Layout}/>
  </BrowserRouter>
)
