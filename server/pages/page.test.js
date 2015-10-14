
module.exports =
{
	run: function(req, obj)
	{
		obj.test = "Hello World!";
	
		return 200;
	}
};
