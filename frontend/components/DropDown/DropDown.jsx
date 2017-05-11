import React from 'react'
import { MDCSimpleMenu, MDCSimpleMenuFoundation } from '@material/menu'
import '@material/menu/dist/mdc.menu.css'


export default class DropDown extends React.Component {
  constructor(props){
    super(props)
    this.state = {focuson: 0}

    this.handleToggle = this.handleToggle.bind(this)
    this.handleItemSelect = this.handleItemSelect.bind(this)
  }

  componentDidMount() {
    this.menu = new MDCSimpleMenu(this.refs.dom_menu)
    this.refs.dom_menu.addEventListener('MDCSimpleMenu:selected', this.handleItemSelect)

  }

  handleToggle(event) {
    if(this.menu.open){
      this.menu.hide()
    }else{
      this.menu.show({focusIndex: this.state.focuson})
    }
  }

  handleItemSelect(event){
    this.setState({focuson: event.detail.index})
  }

  render(){
    const optionList = this.props.options.map( (option, index) =>
      <li key={index} className="mdc-list-item" role="menuitem" tabIndex="0">
        {option}
      </li>
    )

    return (
      <div className="mdc-menu-anchor">
        <button className="drop-button center" onClick={this.handleToggle}>
          {this.props.options[this.state.focuson]}
          <i className="material-icons">keyboard_arrow_down</i>
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
