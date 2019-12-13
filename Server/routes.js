const express = require('express');
const Model = require('./model.js');
const Validation = require('./validation.js');
const router = express.Router();

router.get('/', (req, res, next) => {
	Model.find((err, models) => {
		if (err) return next(err);
		res.json(models);
	});
});

router.post('/', [Validation.ModelPostSchema], (req, res, next) => {
	Model.create(req.body , (err, model) => {
		if (err) return next(err);
		res.status(201).json(model);
	});
});

router.get('/:id', (req, res, next) => {
	Model.findOne({_id: req.params.id}, (err, models) => {
		if (err) return next(err);
		res.json(models);
	});
});

router.delete('/:id', (req, res, next) => {
  Model.findByIdAndRemove(req.params.id, function (err, model) {
    if (err) return next(err);
    res.status(204).json();
  });
});

module.exports = router;