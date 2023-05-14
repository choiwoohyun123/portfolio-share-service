import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {PostUser_register, PostUser_login, GetUser_userlist, GetUser_current,PutUser_userupdate,
        GetUser_err_yellow, GetUser_afterlogin, PutUser_likes, PutUser_dislikes} 
        from "../controllers/userController.js"


const userAuthRouter = Router();

userAuthRouter.post("/user/register", PostUser_register);

userAuthRouter.post("/user/login", PostUser_login);

userAuthRouter.get("/userlist",login_required,GetUser_userlist);

userAuthRouter.get("/user/current",login_required,GetUser_current);

userAuthRouter.put("/users/:id",login_required,PutUser_userupdate);

userAuthRouter.get("/users/:id",login_required,GetUser_err_yellow);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, GetUser_afterlogin);

userAuthRouter.put("/users/:user_id/like",login_required,PutUser_likes);

userAuthRouter.put("/users/:user_id/dislike",login_required,PutUser_dislikes);


export { userAuthRouter };
