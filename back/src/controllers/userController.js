import { userAuthService } from "../services/userService.js";
import is from "@sindresorhus/is";
import * as userValidation from "../validations/userValidation.js";

const PostUser_register = async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const { error } = userValidation.postRegisterUserSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }
      // req (request) 에서 데이터 가져오기
      const { name, email, password } = req.body;
  
      // 위 데이터를 유저 db에 추가하기
      const newUser = await userAuthService.addUser({
        name,
        email,
        password,
      });
  
      if (newUser.errorMessage) {
        throw new Error(newUser.errorMessage);
      }
  
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }


const PostUser_login = async function (req, res, next) {
    try {
      const { error } = userValidation.postLoginUserSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }
      // req (request) 에서 데이터 가져오기
      const { email, password } = req.body;
  
      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userAuthService.getUser({ email, password });
  
      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
  
    return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }



const GetUser_userlist = async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }


const GetUser_current = async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

    return res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }


const PutUser_userupdate = async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;

      const { error } = userValidation.putUpdateUserSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { name, email, description } = req.body;
      const toUpdate = { name, email, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

    return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };



const GetUser_err_yellow =  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

    return res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }


const GetUser_afterlogin = function (req, res, next) {
    res
      .status(200)
      .send(
        `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
      );
  }


  const PutUser_likes = async function (req, res, next) {
      try {
        const user_id = req.params.user_id; // 포스트 주인
        const { pressLikeUserId } = req.body; // 좋아요를 누른 사용자(들)
        const AddLike = await userAuthService.addLike({
          user_id,
          pressLikeUserId,
        });

        if (AddLike.errorMessage) {
          throw new Error(AddLike.errorMessage);
        }

        return res.status(200).json(AddLike);
      } catch (error) {
        next(error);
      }
    }



  const PutUser_dislikes = async function (req, res, next) {
      try {
        const user_id = req.params.user_id;
        const { pressLikeUserId } = req.body;
        const DeleteLike = await userAuthService.deleteLike({
          user_id,
          pressLikeUserId,
        });

        if (DeleteLike.errorMessage) {
          throw new Error(DeleteLike.errorMessage);
        }

        return res.status(200).json(DeleteLike);
      } catch (error) {
        next(error);
      }
    }



export {PostUser_register, PostUser_login, GetUser_userlist, GetUser_current,PutUser_userupdate,
        GetUser_err_yellow, GetUser_afterlogin, PutUser_likes, PutUser_dislikes};