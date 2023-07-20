const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Failed to fetch users." });
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate({ path: "thoughts" });

      if (!user) {
        return res.status(404).json({ message: "User Not Found!" });
      }

      res.json(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Failed to fetch user." });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error("Error creating user:", err);
      res
        .status(500)
        .json({ error: "Failed to create user. Please try again later." });
    }
  },

  async updateUser(req, res) {
    try {
      const newUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );

      if (!newUser) {
        return res.status(404).json({ message: "User Not Found!" });
      }

      res.json(newUser);
    } catch (err) {
      console.error("Error updating user:", err);
      res
        .status(500)
        .json({ error: "Failed to update user. Please try again later." });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "User Not Found!" });
      }

      res.json({ user, message: "User Deleted!" });
    } catch (err) {
      console.error("Error deleting user:", err);
      res
        .status(500)
        .json({ error: "Failed to delete user. Please try again later." });
    }
  },

  async getFriends(req, res) {
    try {
      const user = await User.findById(req.params.userId).select("friends");
      if (!user) {
        return res.status(404).json({ message: "User Not Found!" });
      }
      res.json(user.friends);
    } catch (err) {
      console.error("Error fetching friends:", err);
      res
        .status(500)
        .json({ error: "Failed to fetch friends. Please try again later." });
    }
  },

  async addFriend(req, res) {
    try {
      // Get the friend's ObjectId from the request body
      const { friendId } = req.body;

      // Find the user by their ObjectId and add the friend's ObjectId to the 'friends' array
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User Not Found!" });
      }

      res.json(user);
    } catch (err) {
      console.error("Error adding friend:", err);
      res
        .status(500)
        .json({ error: "Failed to add friend. Please try again later." });
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User Not Found!" });
      }

      res.json(user);
    } catch (err) {
      console.error("Error deleting friend:", err);
      res
        .status(500)
        .json({ error: "Failed to delete friend. Please try again later." });
    }
  },
};
