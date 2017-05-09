import faker from 'faker';
faker.locale = "es_MX";


export const categories = function () {
  var cats = []
  for (var i = 0; i < 7; i++) {
    var c = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
    }

    var mains = []
    for (var j = 0; j < (Math.random() * 4) + 1; j++) {
      var m = {
        id: faker.random.uuid(),
        name: faker.commerce.department()
      }

      var subs = []
      for (var k = 0; k < (Math.random() * 10) + 1; k++) {
        var s = {
          id: faker.random.uuid(),
          name: faker.commerce.department()
        }
        subs.push(s)
      }

      m.subs = subs
      mains.push(m)
    }

    c.mains = mains
    cats.push(c)
  }

  return cats
}


export const category = function () {
  var c = {
    id: faker.random.uuid(),
    name: faker.commerce.department(),
    url: "#"
  }

  var mains = []
  for (var j = 0; j < (Math.random() * 10) + 1; j++) {
    var m = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      to: "#"
    }
    mains.push(m)
  }

  c.mains = mains
  return c
}


export const product = function () {
  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.random.number(),
    discount: faker.random.number({max: 100}),
    plu: Math.round(Math.random() * 9999),
    volumn: `${faker.random.number()}ml`,
    image: 'http://placehold.it/128x150',
    imagelg: 'http://placehold.it/1024x1200',
    description: faker.lorem.paragraphs(),
    benefits: faker.lorem.paragraphs(),
    ingredients: faker.lorem.paragraphs(),
    url: '/product'
  }
}


export const products = function (amount) {
  var ps = []
  for (var i = 0; i < amount; i++) {
    ps.push(product())
  }

  return ps
}

export const user = function () {

  var telephones = []
  for (var i = 0; i < Math.random() * 5; i++) {
    telephones.push(faker.phone.phoneNumber())
  }

  var addresses = []
  for (var i = 0; i < Math.random() * 5; i++) {
    addresses.push(address())
  }

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    telephones: telephones,
    addresses: addresses
  }
}


export const address = function () {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    street1: faker.address.streetAddress(),
    street2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: faker.address.zipCode(),
    country: faker.address.country(),
    telephone: faker.phone.phoneNumber()
  }
}

export const orders = function () {
  var ord = []
  for (var i = 0; i <  Math.random() * 30; i++) {
    ord.push(order())
  }
  return ord
}


export const order = function () {

  var details = []
  for (var i = 0; i < Math.random() * 10; i++) {
    details.push(orderDetail())
  }

  return {
    id: faker.random.number(),
    date: faker.date.past(),
    total: faker.commerce.price(),
    subtotal: faker.commerce.price(),
    shippedTo: address(),
    invoiceTo: address(),
    discount: faker.commerce.price(),
    iva: faker.commerce.price(),
    shippingCost: faker.commerce.price(),
    details: details
  }
}

export const orderDetail = function () {
  return {
    pimg: "http://placehold.it/128x150",
    description: faker.commerce.productName(),
    quantity: faker.random.number({max: 10}),
    price: faker.commerce.price(),
    subtotal: faker.commerce.price()
  }
}


export const codes = function () {
  var c = []
  for (var i = 0; i < Math.random() * 10; i++) {
    c.push({
      code: faker.random.word(),
      discount: faker.random.number({max:100}),
      expire: faker.date.past()
    })
  }
  return c
}
