import express from "express";
import {
  updateUser,
  getSingleUser,
  getAllUser,
  deleteUser,
} from "../Controllers/UserController.js";
const router = express.Router();

import { authentication, restrict } from "../auth/verifyToken.js";

router.get("/:id", authentication, restrict(["patient"]), getSingleUser);
router.get("/", authentication, restrict(["admin"]), getAllUser);
router.put("/:id", authentication, restrict(["patient"]), updateUser);
router.delete("/:id", authentication, restrict(["patient"]), deleteUser);

export default router;
