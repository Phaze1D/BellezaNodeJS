import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown } from 'components/SVGIcons/Material'
import { MDCSimpleMenu, MDCSimpleMenuFoundation } from '@material/menu/dist/mdc.menu.js'


export default class QuantityDrop extends React.Component {
  constructor(props){
    super(props)
    let fo = props.defaultValue ? props.defaultValue - 1 : 0
    this.state = {focuson: fo}
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
    if(this.props.onRequestChange){
      this.props.onRequestChange(event.detail.index + 1)
    }

    this.setState({focuson: event.detail.index})
  }


  render(){
    const {
      stock,
    } = this.props

    const optionList = []
    for (var i = 1; i <= stock; i++) {
      optionList.push(<div key={i} className="mdc-list-item quantity" role="menuitem" tabIndex="0">{i}</div>)
    }

    return (
      <div className="mdc-menu-anchor quantity">
        <input name="quantity" type="hidden" value={this.state.focuson + 1}/>
        <button type="button" className="drop-button center quantity" onClick={this.handleToggle}>
          {this.state.focuson + 1}
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
