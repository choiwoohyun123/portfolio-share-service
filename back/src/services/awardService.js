import { User, Award } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";

class awardService {
  static async addAward({ user_id, title, organization, date }) {
    const id = uuidv4();
    const newAward = { id, user_id, title, organization, date };
    const createdAward = await Award.createAward({ newAward });
    return createdAward;
  }
  static async getAwards({ user_id }) {
    const awards = await Award.findAll({ user_id });
    if (!awards) {
      const errorMessage = "해당 유저의 수상 정보가 존재하지 않습니다.";
      return { errorMessage };
    }
    return awards;
  }
  static async setAward({ award_id, toUpdate }) {
    let award = await Award.findOneById({ award_id });
    if (!award) {
      const errorMessage =
        "해당 수상 정보를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }

    if (toUpdate.organization) {
      const fieldToUpdate = "organization";
      const newValue = toUpdate.organization;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }

    if (toUpdate.date) {
      const fieldToUpdate = "date";
      const newValue = toUpdate.date;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }
    award.errorMessage = null;
    return award;
  }

  static async deleteAward({ award_id }) {
    let isDeleted = await Award.deleteById({ award_id });
    if (!isDeleted) {
      const errorMessage = "삭제할 수상 정보가 없습니다.";
      return { errorMessage };
    }
    return { result: "Success" };
  }
}

export { awardService };
