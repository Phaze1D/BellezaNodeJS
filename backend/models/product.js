'use strict'
let valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {
  const Product =  sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    plu: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: {
        args: true,
        message: valmsg.plu_unique
      },
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        isUnique: (value, next) => {
          Product.findOne({where: {plu: value}})
          .then( (product) => {
            if(product){
              throw new Error(valmsg.plu_unique)
            }
            return next();
          }).catch(next);
        }
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [1, 125],
          msg: valmsg.len(1, 125)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    volume: {
      type: DataTypes.STRING(32),
      allowNull: true,
      validate: {
        len: {
          args: [1, 32],
          msg: valmsg.len(1, 32)
        },
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(25).UNSIGNED,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    discount: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      validate:{
        max: {
          args: 100,
          msg: valmsg.max(100)
        }
      }
    },
    iva: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      validate:{
        max: {
          args: 100,
          msg: valmsg.max(100)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    fav: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: '0'
    },
    active: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'products'
  });

  Product.allOptions = function (querys, active) {
    let search = querys.search
    let category = querys.category
    let sort = querys.sort ? querys.sort : 0
    let page = querys.page ? querys.page : 0

    let sortOptions = [['name', 'ASC'], ['name', 'DESC'], ['price', 'DESC'], ['price', 'ASC']]
    let options = {
      subquery: false,
      attributes: { exclude: ['description', 'ingredients', 'benefits'] },
      offset: 20 * page,
      limit: 20,
      order: [sortOptions[sort]]
    }
    options.where = active ? {active: true}: {}
    if(search){
      options.where.$or = [
        {plu: {$like: `${search}%`}},
        {name: {$like: `${search}%`}}
      ]
    }

    if(category){
      options.include = [{
        model: sequelize.model('Category'),
        as: 'categories',
        where: {id: category},
        attributes: [],
        through: {
          where: {categories_id: category}
        }
      }]
    }
    return options
  }


  Product.singleOptions = function (id) {
    let options = {
      where: {id: id},
      include: [{
        model: sequelize.model('Category'),
        as: 'categories',
        through: {
          where: {products_id: id}
        }
      }]
    }
    return options
  }

  Product.relatedOptions = function (category_id) {
    let options = {
      limit: 4,
      attributes: { exclude: ['description', 'ingredients', 'benefits'] },
    }

    if(category_id){
      options.include = [{
        model: sequelize.model('Category'),
        as: 'categories',
        where: {id: category_id},
        attributes: [],
        through: {
          where: {categories_id: category_id}
        }
      }]
    }

    return options
  }

  return Product
};
