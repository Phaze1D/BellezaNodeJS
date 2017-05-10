import React from 'react'
import { Link } from 'react-router-dom'


export default class Pagination extends React.Component {
  constructor(props){
    super(props)

    this.startMax = 5
  }

  handleClick(index, event){
    this.props.onRequestClick(index, event)
  }

  render(){
    const page = this.props.page

    const children = this.props.links.map( (link, index) =>
      <Link
        key={index}
        to={link.value}
        onClick={this.handleClick.bind(this, index)}
        className={page == index ? "active" : ""}>

        {link.name}
      </Link>
    )

    let startArray = [children[0]]

    if(children.length > 2){
      startArray.push(children[1])
    }

    if(page < this.startMax){
      for (var i = 2; (i <= this.startMax && i < children.length - 1); i++) {
        startArray.push(children[i])
      }
    }

    let endArray = []
    if(page > children.length - this.startMax && page >= this.startMax){
      for (var i = children.length - this.startMax; i < children.length; i++) {
        endArray.push(children[i])
      }
    }else if(children.length > 1){
      endArray.push(children[children.length - 1])
    }

    let midArray = []
    if(page >= this.startMax && page <= children.length - this.startMax){
      for (var i = -1; i < 2; i++) {
        midArray.push(children[page + i])
      }
    }

    return (
      <div className="pagination">
        {children.length > 1 && startArray}

        {midArray.length > 0 && <span>...</span>}
        {midArray.length > 0 && midArray}

        {children.length > this.startMax + 2 && <span>...</span>}

        {endArray}

      </div>
    )
  }
}
