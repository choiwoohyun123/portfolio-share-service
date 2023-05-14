import { certificateService } from "../services/certificateService.js";
import is from "@sindresorhus/is";
import * as certificateValidation from "../validations/certificateValidation.js";

const PostCertificate = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const {error} = certificateValidation.postCertificateSchema.validate(req.body)
    if (error) {
      throw new Error(error.details[0].message)
    }

    // req (request) 에서 데이터 가져오기
    const { user_id, name, organization, issue_date } =
      req.body;

    const newCertificate = await certificateService.addCertificate({
      user_id,
      name,
      organization,
      issue_date,
    });

    return res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
};

const GetCertificate = async (req, res, next) => {
  try {
    const certificate_id = req.params.id;

    const getCertificate = await certificateService.getCertificates({
      user_id: certificate_id,
    });

    // 에러메시지 존재시 에러 던짐
    if (getCertificate.errorMessage) {
      throw new Error(getCertificate.errorMessage);
    }

    // 성공하면 HTTP응답코드(200)와 함께 응답, 에러 발생시 next로 미들웨어 함수로 에러 던짐
    return res.status(200).json(getCertificate);
  } catch (error) {
    next(error);
  }
};

const PutCertificate = async (req, res, next) => {
  try {
    const certificate_id = req.params.id;

    const {error} = certificateValidation.putCertificateSchema.validate(req.body)
    if (error) {
      throw new Error(error.details[0].message)
    }

    const { name, organization, issue_date } = req.body;

    const toUpdate = { name, organization, issue_date };

    const updatedCertificate = await certificateService.setCertificate({
      certificate_id,
      toUpdate,
    });

    // 에러메시지 존재시 에러 던짐
    if (updatedCertificate.errorMessage) {
      throw new Error(updatedCertificate.errorMessage);
    }

    // 성공하면 HTTP응답코드(200)와 함께 응답, 에러 발생시 next로 미들웨어 함수로 에러 던짐
    return res.status(200).json(updatedCertificate);
  } catch (error) {
    next(error);
  }
};

const DeleteCertificate = async (req, res, next) => {
  try {
    const certificate_id = req.params.id;
    const result = await certificateService.deleteCertificate({
      certificate_id,
    });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export { PostCertificate, GetCertificate, PutCertificate, DeleteCertificate };
