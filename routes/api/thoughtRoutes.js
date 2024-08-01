const router = require('express').Router();
const { getThoughts, getOneThought, createThought, deleteThought, updateThought, addThoughtReaction, deleteThoughtReaction } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);
router.route('/:thoughtId/reactions').post(addThoughtReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteThoughtReaction);

module.exports = router;