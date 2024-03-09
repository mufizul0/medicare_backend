import express from "express";
import {
  updateDoctor,
  getSingleDoctor,
  getAllDoctor,
  deleteDoctor,
} from "../Controllers/doctorController.js";

 import { authentication,restrict } from "../auth/verifyToken.js";

 import reviewRouter from './review.js'

  

const router = express.Router();

// nested route 

 router.use("/:doctorId/reviews",reviewRouter)


router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authentication, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authentication, restrict(["doctor"]), deleteDoctor);

export default router;
