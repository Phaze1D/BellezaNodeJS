import faker from 'faker';


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
