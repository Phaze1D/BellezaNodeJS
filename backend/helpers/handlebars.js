module.exports = {
	helpers: {
		formatNumber: function (num) {
			return (num/100).toFixed(2)
		},
		formatImageLink: function (plu) {
			return "https://s3-us-west-1.amazonaws.com/belleza-node/products/xs/" + plu + ".jpg"
		},
		checkType: function (v1, v2, options) {
			if(v1 === v2) {
				return options.fn(this)
			}
			return options.inverse(this)
		}
	}
}
