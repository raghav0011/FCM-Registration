const router = require("express").Router();
const {
  getAllUsers,
  addUsers,
  getUsersByUsername,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
// const { checkOwnership } = require("../middleware/CheckOwnershipMiddleware");

// Get all users and check if the database is empty or not
router.get("/", getAllUsers);

// Get user by username
router.get("/filter", getUsersByUsername);

// Add user
router.post("/add/", addUsers);

// Update user
router.put("/update/:username/", updateUser);

// Delete user
// router.delete("/remove/:username/:ownership",  deleteUser);

//Delete all user
router.delete("/remove/", deleteUser);

module.exports = router;
