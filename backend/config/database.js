module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "bellezaNodeJS",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}
