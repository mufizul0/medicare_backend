import express from 'express'
import { getAllReviews,createReview } from '../Controllers/reviewController.js'
import { authentication ,restrict } from './../auth/verifyToken.js';

 const router = express.Router({mergeParams:true});

  router 
  .route("/")
  .get(getAllReviews)
  .post(authentication, restrict(["patient"]),createReview);

export default router ;

