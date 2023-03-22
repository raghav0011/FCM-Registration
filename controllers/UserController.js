const { mongoConnect } = require("../helper/dbHelper");
const mongoose = require("mongoose");
const userSchema = require("../models/userRegistration.model");
const { success, error } = require("../Response/ApiResponse");
const userData = require("../data/fake");

//Get all users
const getAllUsers = (req, res) => {
  mongoConnect();
  const User = mongoose.model(req.collectionName, userSchema);
  User.find()
    .then((userList) => {
      !userList.length
        ? res.status(404).json(error("There no any data", res.statusCode))
        : res.json(success("success", userList, 200));
    })
    .catch((err) =>
      res.status(400).json(error("Page not found", res.statusCode))
    );
};

//Get users by filter
const getUsersByUsername = async (req, res) => {
  mongoConnect();

  const User = mongoose.model(req.collectionName, userSchema);

  try {
    const filterReq = req.query.filter;
    const Users = await User.find(filterReq);

    if (Users.length == 0) {
      res.status(404).json(error("User not found", res.statusCode));
    } else {
      res.status(200).json(success("success", Users, res.statusCode));
    }
  } catch (error) {
    res.status(500).json(error("Internal server error", res.statusCode));
  }
};

// Add user static
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

//Adding user from the json file (50k)
// const addUsers = async (req, res) => {
//   mongoConnect();

//   const User = mongoose.model(req.collectionName, userSchema);

//   try {
//     function findOcc(arr, key) {
//       let arr2 = [];

//       arr.forEach((x) => {
//         // Checking if there is any object in arr2
//         // which contains the key value
//         if (
//           arr2.some((val) => {
//             return val[key] == x[key];
//           })
//         ) {
//           // If yes! then increase the occurrence by 1
//           arr2.forEach((k) => {
//             if (k[key] === x[key]) {
//               k["occurrence"]++;
//             }
//           });
//         } else {
//           // If not! Then create a new object initialize
//           // it with the present iteration key's value and
//           // set the occurrence to 1
//           let a = {};
//           a[key] = x[key];
//           a["occurrence"] = 1;
//           arr2.push(a);
//         }
//       });

//       return arr2;
//     }

//     let key = "client_username";
//     const string = findOcc(userData, key);
//     // console.log(findOcc(userData, key));
//     // const dublicate = JSON.stringify(string);
//     console.log(string);

//     const newUsers = await User.insertMany(userData);

//     res.json(
//       success(
//         "success",
//         [
//           { "Total user": newUsers.length },
//           { "Dublicated User Count": string.length },
//           { "Dublicated User List": string },
//         ],
//         200
//       )
//     );
//   } catch (err) {
//     res.status(409).json(error("User already exists", res.statusCode));
//   }
// };

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
