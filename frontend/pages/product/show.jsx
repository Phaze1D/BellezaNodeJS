import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ProductResult from 'components/ProductResult/ProductResult'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { getProduct, resetProduct } from 'actions/products'



/**
* HTTP - GET
* @param {object} product - Entire product object with summaries
*
* LOCAL - POST
* @param {object} cartDetail - Adds a product to the cart
*
* LOCAL - POST (on unmount)
* @param {object} reset - An empty object to reset product
*/

@connect( store => {
  return {
    product: store.product
  }
})
export default class ProductShow extends React.Component {
  constructor(props){
    super(props)

    this.handleUrlChanged = this.handleUrlChanged.bind(this)
    this.handleGlobalError = this.handleGlobalError.bind(this)
    this.unlisten = null
    Tabs.setUseDefaultStyles(false);
  }

  componentDidMount() {
    this.handleUrlChanged(this.props.history.location, this.props.history.action)
    this.unlisten = this.props.history.listen(this.handleUrlChanged)
  }

  componentWillUnmount() {
    this.unlisten()
    this.props.dispatch(resetProduct())
  }

  handleUrlChanged(location, action) {
    if(this.props.match.url === location.pathname){
      const id = this.props.match.params.id
      this.props.dispatch(getProduct(id))
      .catch(this.handleGlobalError)
    }
  }

  handleGlobalError(response) {

  }


  render() {
    const {
      product
    } = this.props

    const relatList = product.related.map( (product, index) =>
      <ProductResult key={index} {...product}/>
    )

    return (
      <main>
        <section className="grid-wrap top around">
          <div id="product-mini" className="col-1 col-xs-2 col-xxs-3">
            <img src={product.image}/>
            <img src={product.image}/>
          </div>

          <img className="col-5 col-md-4 col-sm-6 col-xxs-8" src={product.imagelg}/>

          <div className="col-5 col-md-6 col-sm-12">
            <h2>{product.name}</h2>
            <div className="grid-wrap center around">
              <div className="col-8 col-xxs-12">
                <p className="sub-text">PLU: {product.plu} / Disponibles: {product.stock}</p>
                <p className="sub-text primary">${product.price} / {product.volumn}</p>
                <p className="discount-text">Con {product.discount}% de Descuento </p>
              </div>

              <form className="col-4 col-xxs-12 grid end">
                <input className="secondary-button raise grow" type="submit" value="Agregar"/>
                <input name="quantity" type="number" min="0" max="10" defaultValue="1"/>
              </form>
            </div>

            <Tabs className="tabs">

             <TabList className="tablist">
               <Tab className="tab">Descripción</Tab>
               <Tab className="tab">Beneficios y Usos</Tab>
               <Tab className="tab">Ingredientes</Tab>
             </TabList>

             <TabPanel
               className="tab-panel"
               onMouseEnter={(event) => document.body.style.overflow = "hidden"}
               onMouseLeave={(event) => document.body.style.overflow = ""}>
               {product.description}
             </TabPanel>

             <TabPanel
               className="tab-panel"
               onMouseEnter={(event) => document.body.style.overflow = "hidden"}
               onMouseLeave={(event) => document.body.style.overflow = ""}>
               {product.benefits}
             </TabPanel>

             <TabPanel
               className="tab-panel"
               onMouseEnter={(event) => document.body.style.overflow = "hidden"}
               onMouseLeave={(event) => document.body.style.overflow = ""}>
               {product.ingredients}
             </TabPanel>
           </Tabs>

          </div>
        </section>

        <section>
          <h3 className="h-underline">Productos Relacionados</h3>
          <div className="grid-wrap">
            {relatList}
          </div>
        </section>
      </main>
    )
  }
}
