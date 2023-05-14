import { User, Education } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";

class educationService {
  static async addEducation({ user_id, school, major, degree }) {
    const obj = { user_id, school, major, degree };

    const find_education = await Education.findByObj(obj);
    if (find_education) {
      const errorMessage =
        "이미 존재하는 학적입니다. 다른 학적을 추가해주세요.";
      return { errorMessage };
    }

    // DB에 추가하려는 학적 정보가 없다면, 새로 추가 가능
    const id = uuidv4();
    const newEducation = { id, ...obj };
    const createdEducation = await Education.createEducation({ newEducation });
    createdEducation.errorMessage = null;

    return createdEducation;
  }

  static async getEducations({ user_id }) {
    const educations = await Education.findAll({ user_id });
    if (!educations) {
      const errorMessage = "해당 유저의 학적 정보가 존재하지 않습니다.";
      return { errorMessage };
    }
    return educations;
  }

  static async setEducation({ education_id, toUpdate }) {
    let education = await Education.findOneById({ education_id });
    if (!education) {
      const errorMessage =
        "해당 학력 정보를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.degree) {
      const fieldToUpdate = "degree";
      const newValue = toUpdate.degree;
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }
    education.errorMessage = null;
    return education;
  }

  static async deleteEducation({ education_id }) {
    let isDeleted = await Education.deleteById({ education_id });
    if (!isDeleted) {
      const errorMessage = "삭제할 학력 정보가 없습니다.";
      return { errorMessage };
    }
    return { result: "Success" };
  }
}

export { educationService };
