import { educationService } from "../services/educationService.js";
import is from "@sindresorhus/is";
import * as educationValidation from "../validations/educationValidation.js";

const PostEducation = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const {error} = educationValidation.postEducationSchema.validate(req.body)
    if (error) {
      throw new Error(error.details[0].message)
    }

    // req (request) 에서 데이터 가져오기
    const { user_id, school, major, degree } = req.body;

    // 위 데이터를 유저 db에 추가하기: educationService의 addEducation 함수를 호출해 해당 요청 사용자의 학력 정보를 추가함
    const newEducation = await educationService.addEducation({
      user_id,
      school,
      major,
      degree,
    });
    return res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
};

const GetEducation = async (req, res, next) => {
  try {
    // 요청으로부터 학력id값 가져옴 (URL에서 id값 추출)
    const { user_id } = req.params;
    // educationService.getEducation 메서드로 학력 ID에 대한 정보를 가져옴
    const education = await educationService.getEducations({ user_id });

    // 에러메시지 존재시 에러 던짐
    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    // 성공적으로 학력 정보 가져오면 HTTP응답코드(200)와 함께 응답, 에러 발생시 next로 미들웨어 함수로 에러 던짐
    return res.status(200).json(education);
  } catch (error) {
    next(error);
  }
};

const PutEducation = async (req, res, next) => {
  try {
    const education_id = req.params.id;

    const {error} = educationValidation.putEducationSchema.validate(req.body)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const { school, major, degree } = req.body;

    const toUpdate = { school, major, degree };

    // 추출한 필드값을 setEducation 메소드의 인자로 전달하여 해당 학력 정보 업데이트
    const updatedEducation = await educationService.setEducation({
      education_id,
      toUpdate,
    });
    // 에러메시지 존재시 에러 던짐
    if (updatedEducation.errorMessage) {
      throw new Error(updatedEducation.errorMessage);
    }

    // 성공하면 HTTP응답코드(200)와 함께 응답, 에러 발생시 next로 미들웨어 함수로 에러 던짐
    return res.status(200).json(updatedEducation);
  } catch (error) {
    next(error);
  }
};

const DeleteEducation = async (req, res, next) => {
  try {
    const education_id = req.params.id;
    const result = await educationService.deleteEducation({ education_id });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export { PostEducation, GetEducation, PutEducation, DeleteEducation };
