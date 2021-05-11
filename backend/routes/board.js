const router = require('express').Router();
let Board = require('../models/board.model');

router.route('/get-all/:userId').get((req, res) => {
    Board.find({ userId: req.params.userId })
        .then(boards => res.json(boards))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:boardId').get((req, res) => {
    Board.findById(req.params.boardId)
        .populate('columns')
        .populate({ path: 'columns', populate: { path: 'cards' } })
        .then(boards => res.json(boards))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/create').post((req, res) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const columns = [];

    const newBoard = new Board({
        userId,
        name,
        columns,
    });

    newBoard.save()
        .then(() => res.json(newBoard.id))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

*/

module.exports = router;