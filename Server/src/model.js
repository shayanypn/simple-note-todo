var mongoose = require('mongoose');

var ModelSchema = new mongoose.Schema({
  name: String,
  type: String,
  items: [
	{
		content: String,
		completed: Boolean
	}
  ]
});

module.exports = mongoose.model('Model', ModelSchema);
