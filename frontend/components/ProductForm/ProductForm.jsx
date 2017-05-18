import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'


class ProductForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {selectedCats: props.product.get('categories').toJS()}

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
    const {
      product,
      categories,
      onRequestSubmit
    } = this.props

    const errors = product.get('errors')

    const catList = categories.map( (category, index) =>
      <option key={category.get('id')} value={category.get('id')}>{category.get('name')}</option>
    )

    const scatList = this.state.selectedCats.map( (category, index) =>
      <div className="grid top" key={category.id}>
        <input type="text" name="categories[]" disabled="true" value={category.name} className="col-9"/>
        <button
          className="cancel col-3 margin-button"
          style={{marginTop: '0'}}
          onClick={this.handleRemoveCategory.bind(this, index)}>Remove</button>
      </div>
    )

    return (
      <div>
        <form className="main-form grid-wrap" onSubmit={onRequestSubmit}>
          <div className="col-12">
            <label>Activo</label>
            {errors.get('active') && <div className="error-div">{errors.get('active')}</div>}
            <input type="checkbox" name="active" defaultChecked={product.get('active')}/>
          </div>

          <div className="col-4">
            <label>PLU</label>
            {errors.get('plu') && <div className="error-div">{errors.get('plu')}</div>}
            <input type="text" name="plu" className="input" defaultValue={product.get('plu')}/>
          </div>

          <div className="col-4">
            <label>Nombre</label>
            {errors.get('name') && <div className="error-div">{errors.get('name')}</div>}
            <input type="text" name="name" className="input" defaultValue={product.get('name')}/>
          </div>

          <div className="col-4">
            <label>Volumen</label>
            {errors.get('volumn') && <div className="error-div">{errors.get('volumn')}</div>}
            <input type="text" name="volumn" className="input" defaultValue={product.get('volumn')}/>
          </div>

          <div className="col-3">
            <label>Price</label>
            {errors.get('price') && <div className="error-div">{errors.get('price')}</div>}
            <input type="number" min="0" step="any" name="price" className="input input-quantity" defaultValue={product.get('price')}/>
          </div>

          <div className="col-3">
            <label>Discount</label>
            {errors.get('discount') && <div className="error-div">{errors.get('discount')}</div>}
            <input type="number" min="0" max="100" name="discount" className="input input-quantity" defaultValue={product.get('discount')}/>
          </div>

          <div className="col-3">
            <label>Stock</label>
            {errors.get('stock') && <div className="error-div">{errors.get('stock')}</div>}
            <input type="number" min="0" max="100" name="stock" className="input input-quantity" defaultValue={product.get('stock')}/>
          </div>

          <div className="col-3">
            <label>IVA</label>
            {errors.get('iva') && <div className="error-div">{errors.get('iva')}</div>}
            <input type="number" min="0" max="100" step="any" name="iva" className="input input-quantity" defaultValue={product.get('iva')}/>
          </div>

          <div className="col-4">
            <label>Subcategories</label>
            {errors.get('categories') && <div className="error-div">{errors.get('categories')}</div>}
            <select ref='categorySelect' style={{margin: '0 0 18px'}}>
              {catList}
            </select>

            <button className="secondary-button margin-button" onClick={this.handleAddCategory}>Add Category</button>
            {scatList}
          </div>

          <div className="col-4">
            <label>Main Image</label>
            {errors.get('main_image') && <div className="error-div">{errors.get('main_image')}</div>}
            <input type="file" name="main_image"/>
          </div>

          <div className="col-4">
            <label>Second Image</label>
            {errors.get('second_image') && <div className="error-div">{errors.get('second_image')}</div>}
            <input type="file" name="second_image"/>
          </div>

          <div className="col-12">
            <label>Description</label>
            {errors.get('description') && <div className="error-div">{errors.get('description')}</div>}
            <textarea name="description" defaultValue={product.get('description')}></textarea>
          </div>

          <div className="col-12">
            <label>Benefits</label>
            {errors.get('benefits') && <div className="error-div">{errors.get('benefits')}</div>}
            <textarea name="benefits" defaultValue={product.get('benefits')}></textarea>
          </div>

          <div className="col-12">
            <label>Ingredients</label>
            {errors.get('ingredients') && <div className="error-div">{errors.get('ingredients')}</div>}
            <textarea name="ingredients" defaultValue={product.get('ingredients')}></textarea>
          </div>

          <input className="submit full" type="submit" value="Save"/>
          <Link className="cancel full" to="/backoffice/products">Cancel</Link>
        </form>
      </div>
    )
  }
}

export default ProductForm;
