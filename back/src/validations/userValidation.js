import { userAuthService } from "../services/userService.js";
import Joi from "joi";

const postRegisterUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const postLoginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const putUpdateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  description: Joi.string().required(),
});

export { postRegisterUserSchema, postLoginUserSchema, putUpdateUserSchema };