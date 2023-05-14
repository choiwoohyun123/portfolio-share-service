import { projectService } from "../services/projectService.js";
import Joi from "joi";

const postProjectSchema = Joi.object({
  user_id: Joi.string().required(),
  title: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  description: Joi.string(),
});

const putProjectSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  description: Joi.string(),
});

export { postProjectSchema, putProjectSchema };
