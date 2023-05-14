import { awardService } from "../services/awardService.js";
import Joi from "joi";

const postAwardSchema = Joi.object({
  user_id: Joi.string().required(),
  title: Joi.string().required(),
  organization: Joi.string().required(),
  date: Joi.date().required(),
});

const putAwardSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  organization: Joi.string().required(),
  date: Joi.date().required(),
});

export {postAwardSchema, putAwardSchema};