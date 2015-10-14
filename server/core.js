var fs = require('fs');
var path = require('path');

module.exports = {
	includeDirectory: function (includePath) {
		var files = fs.readdirSync(includePath);

		var result = {};
		for (var index in files) {
			var fileParts = files[index].split('.');
			var moduleName = fileParts[1];
			var fileName = './' + path.join(includePath, files[index]);

			result[moduleName] = require(fileName);
		}

		return result;
	}
};