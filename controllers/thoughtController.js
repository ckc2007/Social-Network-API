const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error("Error fetching thoughts:", err);
      res
        .status(500)
        .json({ error: "Failed to fetch thoughts. Please try again later." });
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "Thought Not Found!" });
      }
      res.json(thought);
    } catch (err) {
      console.error("Error fetching thought:", err);
      res
        .status(500)
        .json({ error: "Failed to fetch thought. Please try again later." });
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      console.log(thought);

      const updateUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought } }
      );

      res.json(updateUser);
    } catch (err) {
      console.error("Error creating thought:", err);
      res
        .status(500)
        .json({ error: "Failed to create thought. Please try again later." });
    }
  },

  async updateThought(req, res) {
    try {
      const newThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
      if (!newThought) {
        return res.status(404).json({ message: "Thought Not Found!" });
      }
      res.json(newThought);
    } catch (err) {
      console.error("Error updating thought:", err);
      res
        .status(500)
        .json({ error: "Failed to update thought. Please try again later." });
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "Thought Not Found!" });
      }

      res.json({ thought, message: "Thought Deleted!" });
    } catch (err) {
      console.error("Error deleting thought:", err);
      res
        .status(500)
        .json({ error: "Failed to delete thought. Please try again later." });
    }
  },

  async getReactionsForThought(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findById(thoughtId).populate("reactions");
      if (!thought) {
        return res.status(404).json({ message: "Thought Not Found!" });
      }
      res.json(thought.reactions);
    } catch (err) {
      console.error("Error fetching reactions:", err);
      res
        .status(500)
        .json({ error: "Failed to fetch reactions. Please try again later." });
    }
  },

  async createReaction(req, res) {
    try {
      const { reactionBody, username } = req.body; // Extract the required fields

      const newReaction = await Reaction.create({
        // Create a new Reaction object
        reactionBody,
        username,
      });

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: newReaction._id } }, // Add the reaction's ObjectId to the reactions array
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought Not Found!" });
      }

      res.json(newReaction);
      console.log("reaction added");
    } catch (err) {
      console.error("Error creating reaction:", err);
      res
        .status(500)
        .json({ error: "Failed to create reaction. Please try again later." });
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: req.params.reactionId } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Thought or Reaction Not Found!" });
      }

      res.json(thought);
    } catch (err) {
      console.error("Error deleting reaction:", err);
      res
        .status(500)
        .json({ error: "Failed to delete reaction. Please try again later." });
    }
  },
};
