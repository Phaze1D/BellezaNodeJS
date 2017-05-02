import React from 'react'
import Carousel from 'js/components/Carousel'


export default class Home extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <main>
        <Carousel/>
      </main>
    )
  }
}
