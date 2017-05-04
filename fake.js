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
