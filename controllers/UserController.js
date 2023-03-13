const { mongoConnect } = require("../helper/dbHelper");
const mongoose = require("mongoose");
const userSchema = require("../models/userRegistration.model");
const { success, error } = require("../Response/ApiResponse");

//Get all users
const getAllUsers = (req, res) => {
  mongoConnect();
  const User = mongoose.model(req.collectionName, userSchema);
  User.find()
    .then((userList) => {
      !userList.length
        ? res.status(404).json(error("There is no any data", res.statusCode))
        : res.json(success("success", userList, 200));
    })
    .catch((err) =>
      res.status(400).json(error("Page not found", res.statusCode))
    );
};

//Get users by username
const getUsersByUsername = async (req, res) => {
  mongoConnect();

  const User = mongoose.model(req.collectionName, userSchema);

  try {
    const oneUser = await User.findOne({
      client_username: req.params.username,
    });

    if (oneUser) {
      res.status(200).json(success("success", oneUser, res.statusCode));
    } else {
      res.status(404).json(error("User not found", res.statusCode));
    }
  } catch (error) {
    res.status(500).json(error("Internal server error", res.statusCode));
  }
};

//Add user
const addUsers = async (req, res) => {
  mongoConnect();

  const User = mongoose.model(req.collectionName, userSchema);

  try {
    const newUser = await User.create(req.body);
    res.json(success("success", newUser, 200));
  } catch (err) {
    res.status(409).json(error("User already exists", res.statusCode));
  }
};

//Update User
const updateUser = async (req, res) => {
  mongoConnect();

  const User = mongoose.model(req.collectionName, userSchema);

  try {
    const updatingUser = await User.findOne({
      client_username: req.params.username,
    });

    if (!updatingUser) {
      res.status(404).json(error("User not found", res.statusCode));
    } else {
      const updatedUser = await User.updateOne(updatingUser, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });

      res.json(success("success", req.params.username, 200));
    }
  } catch (err) {
    res.status(500).json(error("Internal server error", res.statusCode));
  }
};

//Delete user
const deleteUser = async (req, res) => {
  mongoConnect();

  const User = mongoose.model(req.collectionName, userSchema);

  try {
    const user = await User.findOne({ client_username: req.params.username });

    if (!user) {
      res.status(404).json(error("User not found", res.statusCode));
    } else {
      await User.deleteOne({ _id: user._id });
      res.json(success("success", user, 200));
    }
  } catch (err) {
    res.status(500).json(error("Internal server error", res.statusCode));
  }
};

module.exports = {
  getAllUsers,
  getUsersByUsername,
  addUsers,
  updateUser,
  deleteUser,
};
