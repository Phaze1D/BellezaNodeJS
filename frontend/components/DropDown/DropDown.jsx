import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown } from 'components/SVGIcons/Material'
import { MDCSimpleMenu, MDCSimpleMenuFoundation } from '@material/menu/dist/mdc.menu.js'


export default class DropDown extends React.Component {
  constructor(props){
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    this.menu = new MDCSimpleMenu(this.refs.dom_menu)
  }

  handleToggle(event) {
    if(this.menu.open){
      this.menu.hide()
    }else{
      this.menu.show({focusIndex: this.props.focuson})
    }
  }

  handleItemSelect(index, event){
    this.props.onRequestItem(index)
  }

  render(){
    const {
      url,
      focuson
    } = this.props

    const options = [
      {link: `${url}page=0&sort=0`, name:"A-Z"},
      {link: `${url}page=0&sort=1`, name:"Z-A"},
      {link: `${url}page=0&sort=2`, name:"Precio Alto"},
      {link: `${url}page=0&sort=3`, name:"Precio Bajo"}
    ]

    const optionList = options.map( (option, index) =>
      <Link
        to={option.link} key={index}
        onClick={this.handleItemSelect.bind(this, index)}
        className="mdc-list-item" role="menuitem" tabIndex="0">
        {option.name}
      </Link>
    )

    return (
      <div className="mdc-menu-anchor">
        <button className="drop-button center" onClick={this.handleToggle}>
          {options[focuson].name}
          <ArrowDown/>
        </button>
        <div ref="dom_menu" className="mdc-simple-menu" tabIndex="-1">
          <ul className="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
            {optionList}
          </ul>
        </div>
      </div>
    )
  }
}
