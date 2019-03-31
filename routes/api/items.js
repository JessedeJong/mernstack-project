const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

// @route POST api/items
// @desc Create item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => res.json(item))
        .catch(err => console.log(err));
});

// @route DELETE api/items
// @desc Delete item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => 
            item.remove().then(() => res.json({ success: true }))    
        )
        .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;