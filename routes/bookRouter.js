const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const verifyJWT = require("../middleware/verifyJWT");
const roles = require("../helper/userRoles");

router.get(
  "/",
  verifyJWT({ roles: [roles.admin, roles.staff] }),
  bookController.getAll
);

module.exports = router;
