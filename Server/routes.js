const express = require('express');
const homeRouter = express.Router();

/** HOME */
homeRouter.get('/', (req, res) => {
	res.status(200).send({
		status: 'healthy'
	});
});

module.exports = {
	homeRouter
};