var validFields = [
	"_id",
	"username"
];

module.exports = {
	exportUser: function (user) {
		var result = {};

		for (var index in validFields) {
			var key = validFields[index];
			result[key] = user[key];
		}

		return result;
	}
};
