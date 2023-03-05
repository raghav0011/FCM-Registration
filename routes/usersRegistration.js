const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("../models/userRegistration.model");
const { success, error } = require("../Response/ApiResponse");

require("dotenv").config();

ownerShipArray = process.env.OWNERSHIP_ARRAY;

//Validate ownership middleware
function checkOwnership(req, res, next) {
  const collectionName = req.params.ownership;
  if (ownerShipArray.includes(collectionName)) {
    req.collectionName = collectionName; // set the collection name in the request object
    next();
  } else {
    res.status(404).json(error("Page not found", res.statusCode));
  }
}

//Get all user and check if the database is empty or not
router.route("/:ownership").get(checkOwnership, (req, res) => {
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
});

//Get user by username
router.route("/:ownership/:username").get(checkOwnership, async (req, res) => {
  const User = mongoose.model(req.collectionName, userSchema);
  0;
  const oneUser = await User.findOne({
    client_username: req.params.username,
  });

  !oneUser
    ? res.status(404).json(error("User not found", res.statusCode))
    : res.status(200).json(success("success", oneUser, res.statusCode));
});

//Add user
router.route("/add/:ownership").post(checkOwnership, async (req, res) => {
  const User = mongoose.model(req.collectionName, userSchema);

  await User.create(req.body)
    .then((userList) => {
      res.json(success("success", userList, 200));
    })
    .catch(() =>
      res.status(409).json(error("User already exist", res.statusCode))
    );
});

// Delete user
router
  .route("/remove/:username/:ownership")
  .delete(checkOwnership, async (req, res) => {
    const User = mongoose.model(req.collectionName, userSchema);

    try {
      const user = await User.findOne({ client_username: req.params.username });

      await User.deleteOne({ _id: user._id });
      res.json(success("success", user, 200));
    } catch (err) {
      res.status(402).json(error("rejected", res.statusCode));
    }
  });

//update user
router
  .route("/update/:username/:ownership")
  .put(checkOwnership, async (req, res) => {
    const User = mongoose.model(req.collectionName, userSchema);

    let upadatingUser = await User.findOne({
      client_username: req.params.username,
    });

    !upadatingUser
      ? res.status(402).json(error("rejected", res.statusCode))
      : (updatedUser = await User.updateOne(upadatingUser, req.body, {
          new: true,
          useFindAndModify: false,
          runValidators: true,
        }));

    res.json(success("success", req.params.username, 200));
  });

module.exports = router;
