const { Thoughts } = require("../models");

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get one thought by id
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughts) => {
        !thoughts
          ? res.status(404).json({ message: "No Thought find with this ID!" })
          : res.json(thoughts);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No User find with this ID!" })
          : res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // update a thought by id
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // delete a thought by id
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought deleted, but no user found" })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a reaction to a thought
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought frind with ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete reaction
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
