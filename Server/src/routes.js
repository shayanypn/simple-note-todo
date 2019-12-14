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

router.get('/:id', (req, res, next) => {
	Model.findOne({_id: req.params.id}, (err, model) => {
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

router.put('/:id',[Validation.ModelPostSchema], (req, res, next) => {
  Model.findByIdAndUpdate(req.params.id, req.body, (err, model) => {
    if (err) return next(err);
    res.status(200).json(model);
  });
});

router.put('/:id/completed/:item_id',(req, res, next) => {

	Model.findOne({_id: req.params.id}, (err, model) => {
		if (err) return next(err);

		let updatedItem = {}

		model['items'] = model.items.map(item => {
			if (item._id == req.params.item_id) {
				item['completed'] = !item.completed;
				updatedItem = item;
			}
			return item;
		});

		Model.findByIdAndUpdate(req.params.id, model, (err, new_model) => {
			if (err) return next(err);
			res.status(200).json(updatedItem);
		});
	});

});

router.delete('/:id', (req, res, next) => {
  Model.findByIdAndRemove(req.params.id, (err, model) => {
    if (err) return next(err);
    res.status(204).json();
  });
});

module.exports = router;