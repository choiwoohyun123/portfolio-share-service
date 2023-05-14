import { AwardModel } from "../schemas/award.js";

class Award {
  static async createAward({ newAward }) {
    const createdNewAward = AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findOneById({ award_id }) {
    const award = await AwardModel.findOne({ id: award_id });
    return award;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { id: award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }
  static async deleteById({ award_id }) {
    const deletedAward = await AwardModel.deleteOne({ id: award_id });
    const isCompleteDeleted = deletedAward.deletedCount === 1;
    return isCompleteDeleted;
  }

  static async findByObj({ user_id, title, organization, date }) {
    const findAward = await AwardModel.findOne({
      user_id,
      title,
      organization,
      date,
    });
    return findAward;
  }

  static async findAll({ user_id }) {
    const Awards = await AwardModel.find({ user_id: user_id });
    return Awards;
  }
}

export { Award };
