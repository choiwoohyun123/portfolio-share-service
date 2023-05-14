import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
// import { certificateService } from "../services/certificateService.js";
import {
  PostCertificate,
  GetCertificate,
  PutCertificate,
  DeleteCertificate,
} from "../controllers/certificateController.js";

const certificateRouter = Router();

certificateRouter.post("/certificates", PostCertificate);

certificateRouter.get("/certificates/:id", login_required, GetCertificate);

certificateRouter.put("/certificates/:id", login_required, PutCertificate);

certificateRouter.delete("/certificates/:id", login_required, DeleteCertificate);


export { certificateRouter };
