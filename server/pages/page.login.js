var models = require("../models.js");

module.exports = {
	run: function(req, obj) {
		obj.result = "NoError";
		
		var user = null;		
		models.user.find({name: "Test"}, function(err, result) {
			if (err)
			{
				obj.result = "NotFound";
			}
			else if (user)
			{
				obj.result = "MultipleMatches";
			}
			else
			{
				user = result;
			}
		});
		
		if (!user)
		{
			user = new models.user({name : "Test"});
			user.save(function (err) {
				obj.result = "DatabaseError";
			});
		}
				
		obj.name = user.name;

		return 200;
	}
};
