import { EducationModel } from "../schemas/education.js";

// Education 클래스
class Education {
  // 새로운 교육 정보를 생성하는 메서드
  static async createEducation({ newEducation }) {
    const createdNewEducation = EducationModel.create(newEducation);
    return createdNewEducation;
  }

  // 교육 정보 id에 해당하는 교육 정보를 조회하는 메서드
  static async findOneById({ education_id }) {
    const education = await EducationModel.findOne({ id: education_id });
    return education;
  }

  // 교육 정보 id에 해당하는 교육 정보를 업데이트하는 메서드
  static async update({ education_id, fieldToUpdate, newValue }) {
    // id가 education_id인 교육 정보를 찾는다.
    const filter = { id: education_id };
    // 업데이트할 필드와 값으로 update 객체를 만든다.
    const update = { [fieldToUpdate]: newValue };
    // 업데이트된 교육 정보를 반환하기 위해 returnOriginal: false 옵션을 사용한다.
    const option = { returnOriginal: false };

    // 교육 정보를 업데이트하고, 업데이트된 교육 정보를 반환한다.
    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
  static async deleteById({ education_id }) {
    const deletedEducation = await EducationModel.deleteOne({ id: education_id });
    const isCompleteDeleted = deletedEducation.deletedCount === 1;
    return isCompleteDeleted;
  }

  // 추가! obj정보가 포함된 정보를 반환해주는 함수 (하나의 정보만 반환)
  static async findByObj({ user_id, school, major, degree }) {
    const findEducation = await EducationModel.findOne({
      user_id,
      school,
      major,
      degree,
    });
    return findEducation;
  }

  // 추가! user_id가 가지고 있는 모든 학력 정보들을 반환해주는 함수 (여러 정보를 반환할 수 있음)
  static async findAll({ user_id }) {
    const educations = await EducationModel.find({ user_id: user_id });
    return educations;
  }
}

export { Education };
