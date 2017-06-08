module.exports = {
  helpers: {
    formatNumber: function (num) {
      return (num/100).toFixed(2)
    },
    formatImageLink: function (plu) {
      return "https://s3-us-west-1.amazonaws.com/belleza-node/products/xs/" + plu + ".jpg"
    }
  }
}
