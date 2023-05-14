import { awardService } from "../services/awardService.js";
import is from "@sindresorhus/is";
import * as awardValidation from "../validations/awardValidation.js";

const PostAward = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { error } = awardValidation.postAwardSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const { user_id, title, organization, date } = req.body;

    const newAward = await awardService.addAward({
      user_id,
      title,
      organization,
      date,
    });
    return res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
};

const GetAward = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const award = await awardService.getAwards({ user_id });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }
    return res.status(200).json(award);
  } catch (error) {
    next(error);
  }
};

const PutAward = async (req, res, next) => {
  try {
    const award_id = req.params.id;

    const { error } = awardValidation.putAwardSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { title, organization, date } = req.body;

    const toUpdate = { title, organization, date };

    const updatedAward = await awardService.setAward({
      award_id,
      toUpdate,
    });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    return res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
};

const DeleteAward = async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const result = await awardService.deleteAward({ award_id });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export { PostAward, GetAward, PutAward, DeleteAward };