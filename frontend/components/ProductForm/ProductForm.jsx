import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

const cats = []

class ProductForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {selectedCats: cats}

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
      <div className="grid top" key={category.id}>
        <input type="text" disabled="true" defaultValue={category.name} className="col-9"/>
        <button
          className="cancel col-3 margin-button"
          style={{marginTop: '0'}}
          onClick={this.handleRemoveCategory.bind(this, index)}>Remove</button>
      </div>
    )

    return (
      <div>
        <form className="main-form grid-wrap">
          <div className="col-12">
            <label>Activo</label>
            <input type="checkbox" defaultChecked={this.props.active}/>
          </div>

          <div className="col-4">
            <label>PLU</label>
            <input type="text" name="plu" className="input" defaultValue={this.props.plu}/>
          </div>

          <div className="col-4">
            <label>Nombre</label>
            <input type="text" name="name" className="input" defaultValue={this.props.name}/>
          </div>

          <div className="col-4">
            <label>Volumen</label>
            <input type="text" name="volumn" className="input" defaultValue={this.props.volumn}/>
          </div>

          <div className="col-3">
            <label>Price</label>
            <input type="number" min="0" step="any" name="price" className="input input-quantity" defaultValue={this.props.price}/>
          </div>

          <div className="col-3">
            <label>Discount</label>
            <input type="number" min="0" max="100" name="discount" className="input input-quantity" defaultValue={this.props.discount}/>
          </div>

          <div className="col-3">
            <label>Stock</label>
            <input type="number" min="0" max="100" name="stock" className="input input-quantity" defaultValue={this.props.stock}/>
          </div>

          <div className="col-3">
            <label>IVA</label>
            <input type="number" min="0" max="100" step="any" name="iva" className="input input-quantity" defaultValue={this.props.iva}/>
          </div>

          <div className="col-4">
            <label>Subcategories</label>
            <select ref='categorySelect' style={{margin: '0 0 18px'}}>
              {catList}
            </select>

            <button className="secondary-button margin-button" onClick={this.handleAddCategory}>Add Category</button>
            {scatList}
          </div>

          <div className="col-4">
            <label>Main Image</label>
            <input type="file" name="main_image"/>
          </div>

          <div className="col-4">
            <label>Second Image</label>
            <input type="file" name="second_image"/>
          </div>

          <div className="col-12">
            <label>Description</label>
            <textarea defaultValue={this.props.description}></textarea>
          </div>

          <div className="col-12">
            <label>Benefits</label>
            <textarea defaultValue={this.props.benefits}></textarea>
          </div>

          <div className="col-12">
            <label>Ingredients</label>
            <textarea defaultValue={this.props.ingredients}></textarea>
          </div>

          <input className="submit full" type="submit" value="Save"/>
          <Link className="cancel full" to="/backoffice/products/index">Cancel</Link>
        </form>
      </div>
    )
  }
}

export default ProductForm;
