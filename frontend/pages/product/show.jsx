import React from 'react'
import ProductResult from 'components/ProductResult/ProductResult'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
Tabs.setUseDefaultStyles(false);

import {products, product} from '../../../fake'
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
        <section className="grid-wrap top around">
          <div id="product-mini" className="col-1">
            <img src={pt.image}/>
            <img src={pt.image}/>
          </div>

          <img className="col-5 col-md-4 col-sm-6" src={pt.imagelg}/>

          <div className="col-5 col-md-6 col-sm-12">
            <h2>{pt.name}</h2>
            <div className="grid center">
              <div className="col-8">
                <p className="sub-text">PLU: {pt.plu} / Disponibles: {pt.stock}</p>
                <p className="sub-text primary">${pt.price} / {pt.volumn}</p>
                <p className="discount-text">Con {pt.discount}% de Descuento </p>
              </div>

              <form className="col-4 grid end">
                <input className="secondary-button raise" type="submit" value="Agregar"/>
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
               {pt.description}
             </TabPanel>

             <TabPanel
               className="tab-panel"
               onMouseEnter={(event) => document.body.style.overflow = "hidden"}
               onMouseLeave={(event) => document.body.style.overflow = ""}>
               {pt.benefits}
             </TabPanel>

             <TabPanel
               className="tab-panel"
               onMouseEnter={(event) => document.body.style.overflow = "hidden"}
               onMouseLeave={(event) => document.body.style.overflow = ""}>
               {pt.ingredients}
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
