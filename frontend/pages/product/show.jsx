import React from 'react'
import ProductResult from 'components/ProductResult/ProductResult'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
Tabs.setUseDefaultStyles(false);


import { products, product } from '../../../fake'

const related = products(4)
const pt = product()

export default class ProductShow extends React.Component {
  constructor(props){
    super(props)
  }



  render() {

    const relatList = related.map( (product, index) =>
      <ProductResult key={index} {...product}/>
    )

    return (
      <main>
        <section className="product__section">
          <div className="product__mini">
            <img src={pt.image}/>
            <img src={pt.image}/>
          </div>

          <img className="product__main-img" src={pt.imagelg}/>

          <div className="product__info">
            <h2>{pt.name}</h2>
            <div className="product__details">
              <div>
                <p className="product__sub-info">PLU: {pt.plu} / Disponibles: {pt.stock}</p>
                <p className="product__main-info">${pt.price} / {pt.volumn}</p>
                <p className="product__discount">Con {pt.discount}% de Descuento </p>
              </div>

              <form>
                <input className="add-button" type="submit" value="Agregar al Carrito"/>
                <input className="input input-quantity" name="quantity" type="number" min="0" max="10" defaultValue="1"/>
              </form>
            </div>

            <Tabs
              className="product__tabs">

             <TabList className="product__tablist">
               <Tab className="product__tab">Descripción</Tab>
               <Tab className="product__tab">Beneficios y Usos</Tab>
               <Tab className="product__tab">Ingredientes</Tab>
             </TabList>

             <TabPanel className="product__tab-panel smooth">
               {pt.description}
             </TabPanel>

             <TabPanel className="product__tab-panel smooth">
               {pt.benefits}
             </TabPanel>

             <TabPanel className="product__tab-panel smooth">
               {pt.ingredients}
             </TabPanel>
           </Tabs>

          </div>
        </section>

        <section>
          <h3 className="h-underline">Productos Relacionados</h3>
          <div className="results__grid">
            {relatList}
          </div>
        </section>
      </main>
    )
  }
}
