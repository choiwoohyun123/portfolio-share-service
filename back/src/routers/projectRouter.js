import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
// import { projectService } from "../services/projectService.js";
import {PostProject, GetProject, PutProject, DeleteProject} from "../controllers/projectController.js"

const projectRouter = Router();

// 프로젝트 정보 추가
projectRouter.post(
  "/projects", 
  PostProject
);

// 프로젝트 정보 조회
projectRouter.get(
  "/projects/:user_id",
  login_required,
  GetProject
);

// 학력 정보 수정
projectRouter.put(
  "/projects/:id", 
  login_required, 
  PutProject
);

//학력 정보 삭제
projectRouter.delete(
  "/projects/:id",
  login_required,
  DeleteProject
);

export { projectRouter };
