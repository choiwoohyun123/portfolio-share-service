import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
// import { awardService } from "../services/awardService.js";
import {PostAward, GetAward, PutAward, DeleteAward} from "../controllers/awardController.js"

const awardRouter = Router();

awardRouter.post(
  "/awards", 
  login_required,
  PostAward 
);

awardRouter.get(
  "/awards/:user_id", 
  login_required, 
  GetAward
);

awardRouter.put(
  "/awards/:id", 
  login_required, 
  PutAward
);


awardRouter.delete(
  "/awards/:id", 
  login_required, 
  DeleteAward
);

export { awardRouter };
