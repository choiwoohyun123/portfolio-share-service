import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {PostEducation, GetEducation, PutEducation, DeleteEducation} from "../controllers/educationController.js"

const educationRouter = Router();

// 학력 정보 추가
educationRouter.post(
  "/educations", 
  login_required, 
  PostEducation
  );


// 학력 정보 조회
educationRouter.get(
  "/educations/:user_id",
  login_required,
  GetEducation
);

// 학력 정보 수정
educationRouter.put(
  "/educations/:id",
  login_required,
  PutEducation
);

educationRouter.delete(
  "/educations/:id",
  login_required,
  DeleteEducation
);

export { educationRouter };
