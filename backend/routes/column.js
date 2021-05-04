const router = require('express').Router();
let Column = require('../models/column.model');
let Board = require('../models/board.model');

router.route('/get-all/:boardId').get((req, res) => {
    Column.find({ columnId: req.params.boardId })
        .populate('cards')
        .then(columns => res.json(columns))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create/:boardId').post((req, res) => {
    const boardId = req.params.boardId;
    const name = req.body.name;
    const color = "#FFFFFF";
    const cards = []

    const newColumn = new Column({
        boardId,
        name,
        color,
        cards
    });

    newColumn.save()
        .then(() => {
            Board.findById(req.params.boardId)
                .update({
                    $push: {
                        columns: newColumn.id
                    }
                }).then(() => res.json('New column created!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;