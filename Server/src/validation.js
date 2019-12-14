const Joi = require('joi');
const expressJoiMiddleware = require('express-joi-middleware');

const MapErrors = (error) => {
	return error.details.map(x => {
		return {
			msg: x.message.replace('\"', '').replace('\"', ''),
			element: x.context.label,
		};
	});
}

const ItemValidationSchema = Joi.object().keys({
	content: Joi.string(),
	completed: Joi.boolean()
});

const BodyValidationSchema = Joi.object().keys({
	name: Joi.string().required(),
	type: Joi.string().allow(['note', 'todo']).required(),
	items: Joi.array().items(ItemValidationSchema)
});

const ModelPostSchema = (req, res, next) => {
	const result = BodyValidationSchema.validate(req.body);

	if (!result.error) {
		next();
	} else {
		res
		.status(422)
		.json({
			message: 'problem on validation data',
			errors: MapErrors(result.error)
		});
	}
};

module.exports = {
	ModelPostSchema
}
