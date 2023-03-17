// Import necessary modules
const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

//----Routes---///

// /api/thoughts => GET all and POST thought
router.route("/").get(getAllThoughts).post(createThought);

// //api/thoughts/:thoughtId/ => GET one thought, PUT and DELETE by an id
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions =>  POST new reactions
router.route("/:thoughtId/reactions").post(createReaction);

//  /api/thoughts/:thoughtId/reactions/:reactionsId => delete a reaction through id
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
