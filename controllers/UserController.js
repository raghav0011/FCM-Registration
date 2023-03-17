const { mongoConnect } = require("../helper/dbHelper");
const mongoose = require("mongoose");
const userSchema = require("../models/userRegistration.model");
const { success, error } = require("../Response/ApiResponse");
const userData = require("../data/dummy_mock_up_data_external_fcm");

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
      CLIENT_USERNAME: req.params.username,
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

//Add user static
// const addUsers = async (req, res) => {
//   mongoConnect();

//   const User = mongoose.model(req.collectionName, userSchema);

//   try {
//     const newUser = await User.create(req.body);
//     res.json(success("success", newUser, 200));
//   } catch (err) {
//     res.status(409).json(error("User already exists", res.statusCode));
//   }
// };

//Adding user from the json file (50k)
const addUsers = async (req, res) => {
  mongoConnect();

  const User = mongoose.model(req.collectionName, userSchema);

  const countDuplicates = (arr) => {
    const count = {};
    arr.map((item) => {
      count[item.REGISTRATION_ID] = (count[item.REGISTRATION_ID] || 0) + 1;
    });
    return count;
  };
  const duplicates = countDuplicates(userData);
  const count = Object.values(duplicates).filter((value) => value > 1).length;

  try {
    const newUsers = await User.insertMany(userData);
    res.json(
      success(
        "success",
        [`Total User : ${newUsers.length}, Dublicated User: ${count}`],
        200
      )
    );
  } catch (err) {
    res.status(409).json(error("User already exists", res.statusCode));
    console.log(userData);
  }
};

//Update User
const updateUser = async (req, res) => {
  mongoConnect();

  const User = mongoose.model(req.collectionName, userSchema);

  try {
    const updatingUser = await User.findOne({
      CLIENT_USERNAME: req.params.username,
    });

    if (!updatingUser) {
      // res.status(404).json(error("User not found", res.statusCode));
      const newUser = await User.create(req.body);
      res.json(success("success", newUser, 200));
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
// const deleteUser = async (req, res) => {
//   mongoConnect();

//   const User = mongoose.model(req.collectionName, userSchema);

//   try {
//     const user = await User.findOne({ CLIENT_USERNAME: req.params.username });

//     if (!user) {
//       res.status(404).json(error("User not found", res.statusCode));
//     } else {
//       await User.deleteOne({ CLIENT_USERNAME: req.params.username });
//       res.json(success("success", user, 200));
//     }
//   } catch (err) {
//     res.status(500).json(error("Internal server error", res.statusCode));
//   }
// };

//delete all user in database
const deleteUser = async (req, res) => {
  mongoConnect();

  const User = mongoose.model(req.collectionName, userSchema);

  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      res.status(404).json(error("No users found", res.statusCode));
    } else {
      await User.deleteMany();
      res.json(success("success", "deleted", 200));
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
