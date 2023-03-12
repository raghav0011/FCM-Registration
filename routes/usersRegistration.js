const router = require("express").Router();
const {
  getAllUsers,
  addUsers,
  getUsersByUsername,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
const { checkOwnership } = require("../middleware/CheckOwnershipMiddleware");

// Get all users and check if the database is empty or not
router.get("/:ownership", checkOwnership, getAllUsers);

// Get user by username
router.get("/:ownership/:username", checkOwnership, getUsersByUsername);

// Add user
router.post("/add/:ownership", checkOwnership, addUsers);

// Update user
router.put("/update/:username/:ownership", checkOwnership, updateUser);

// Delete user
router.delete("/remove/:username/:ownership", checkOwnership, deleteUser);

module.exports = router;
