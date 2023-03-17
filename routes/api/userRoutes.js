const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users => GET all and POST
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id => GET one, PUT, and DELETE
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

//  /api/users/:userId/friends/:friendId => POST and DELETE
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
