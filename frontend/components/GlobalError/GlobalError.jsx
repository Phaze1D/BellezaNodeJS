import React from 'react'
import { connect } from 'react-redux'


@connect( store => {
  return {
    global: store.errors.global
  }
})
export default class GlobalError extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){

    return (
      <div id="error-box">
        

      </div>
    )
  }
}
