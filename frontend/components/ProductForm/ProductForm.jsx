import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

import {categories} from '../../../fake'
const cats = categories()

class ProductForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {selectedCats: categories()}

    this.handleAddCategory = this.handleAddCategory.bind(this)
  }

  componentDidMount() {
    if(window.tinymce){
      tinymce.init({
        selector: 'textarea'
      })
    }
  }

  componentWillUnmount() {
    if(window.tinymce){
      tinymce.remove('textarea');
    }
  }

  handleAddCategory(event){
    event.preventDefault()
    let selected = this.refs.categorySelect.options[this.refs.categorySelect.selectedIndex]
    let newItem = {
      name: selected.text,
      id: selected.value
    }

    let contain = false;
    for (var i = 0; i < this.state.selectedCats.length; i++) {
      if(this.state.selectedCats[i].id === newItem.id){
        contain = true
      }
    }

    if(!contain){
      this.setState({ selectedCats: this.state.selectedCats.concat([newItem]) })
    }
  }

  handleRemoveCategory(index, event){
    event.preventDefault()
    let cats = this.state.selectedCats.splice(0)
    cats.splice(index, 1)
    this.setState({selectedCats: cats})
  }

  render () {

    const catList = cats.map( (category, index) =>
      <option key={category.id} value={category.id}>{category.name}</option>
    )

    const scatList = this.state.selectedCats.map( (category, index) =>
      <div className="procat-list" key={category.id}>
        <input type="text" disabled="true" defaultValue={category.name} className="input"/>
        <button className="cancel" onClick={this.handleRemoveCategory.bind(this, index)}>Remove</button>
      </div>
    )

    return (
      <div>
        <form className="flex-green-form">
          <div className="fu">
            <label>Activo</label>
            <input type="checkbox" defaultChecked={this.props.active}/>
          </div>

          <div className="lg">
            <label>PLU</label>
            <input type="text" name="plu" className="input" defaultValue={this.props.plu}/>
          </div>

          <div className="lg">
            <label>Nombre</label>
            <input type="text" name="name" className="input" defaultValue={this.props.name}/>
          </div>

          <div className="lg">
            <label>Volumen</label>
            <input type="text" name="volumn" className="input" defaultValue={this.props.volumn}/>
          </div>

          <div className="md">
            <label>Price</label>
            <input type="number" min="0" step="any" name="price" className="input input-quantity" defaultValue={this.props.price}/>
          </div>

          <div className="md">
            <label>Discount</label>
            <input type="number" min="0" max="100" name="discount" className="input input-quantity" defaultValue={this.props.discount}/>
          </div>

          <div className="md">
            <label>Stock</label>
            <input type="number" min="0" max="100" name="stock" className="input input-quantity" defaultValue={this.props.stock}/>
          </div>

          <div className="md">
            <label>IVA</label>
            <input type="number" min="0" max="100" step="any" name="iva" className="input input-quantity" defaultValue={this.props.iva}/>
          </div>

          <div className="lg">
            <label>Subcategories</label>
            <select ref='categorySelect'>
              {catList}
            </select>

            <button className="add-button add-cat" onClick={this.handleAddCategory}>Add Category</button>
            {scatList}
          </div>

          <div className="lg">
            <label>Main Image</label>
            <input type="file" name="main_image"/>
          </div>

          <div className="lg">
            <label>Second Image</label>
            <input type="file" name="second_image"/>
          </div>

          <div className="fu">
            <label>Description</label>
            <textarea defaultValue={this.props.description}></textarea>
          </div>

          <div className="fu">
            <label>Benefits</label>
            <textarea defaultValue={this.props.benefits}></textarea>
          </div>

          <div className="fu">
            <label>Ingredients</label>
            <textarea defaultValue={this.props.ingredients}></textarea>
          </div>

          <input type="submit" value="Save" className="submit"/>
          <Link className="cancel" to="/backoffice/products/index">Cancel</Link>
        </form>
      </div>
    )
  }
}

export default ProductForm;
