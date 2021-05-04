const router = require('express').Router();
let Card = require('../models/card.model');
let Column = require('../models/column.model');

router.route('/get-all/:columnId').get((req, res) => {
    Card.find({ columnId: req.params.columnId })
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create/:columnId').post((req, res) => {
    const columnId = req.params.columnId;
    const name = req.body.name;
    const color = "#FFFFFF";
    const description = "";

    const newCard = new Card({
        columnId,
        name,
        color,
        description
    });

    newCard.save()
        .then(() => {
            Column.findById(req.params.columnId)
                .update({
                    $push: {
                        cards: newCard.id
                    }
                }).then(() => res.json('New card created!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;