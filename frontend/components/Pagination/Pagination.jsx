import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'


export default class Pagination extends React.PureComponent {
  constructor(props){
    super(props)
    this.startMax = 5
    this.small = false
  }

  componentWillMount() {
    if(window.innerWidth <= 712){
      this.small = true
    }
  }

  handleClick(index, event){
    if(index >= 0 && index < this.props.links.length){
      this.props.onRequestClick(index, event)
    }else{
      event.preventDefault()
    }
  }

  render(){
    const page = this.props.page

    const children = this.props.links.map( (link, index) =>
      <Link
        key={index}
        to={link.value}
        onClick={this.handleClick.bind(this, index)}
        className={page == index ? "dark-button margin-button" : "white-button margin-button"}>

        {link.name}
      </Link>
    )

    if(this.small){
      const ar = classnames('white-button margin-button arrow-button', {'disable': page - 1 <= -1})
      const al = classnames('white-button margin-button arrow-button', {'disable': page + 1 >= children.length})

      return (
        <div className="grid center">
          <Link className={ar} to={page > 0 ? this.props.links[page - 1].value : '#'}
            onClick={this.handleClick.bind(this, page - 1)}>
            <i className="material-icons">keyboard_arrow_left</i>
          </Link>
          {children[page]}
          <Link className={al} to={page < this.props.links.length - 1 ? this.props.links[page + 1].value : '#'}
            onClick={this.handleClick.bind(this, page + 1)}>
            <i className="material-icons">keyboard_arrow_right</i>
          </Link>
        </div>
      )

    }else{
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
        <div className="grid center">
          {children.length > 1 && startArray}

          {midArray.length > 0 && <span className="white-button disable margin-button">...</span>}
          {midArray.length > 0 && midArray}

          {children.length > this.startMax + 2 && <span className="white-button disable margin-button">...</span>}

          {endArray}

        </div>
      )
    }
  }
}
