import { User, Certificate } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";

class certificateService {
  static async addCertificate({
    user_id,
    name,
    organization,
    issue_date,
  }) {
    const obj = { user_id, name, organization, issue_date };

    const find_certificate = await Certificate.findByObj(obj);

    if (find_certificate) {
      const errorMessage =
        "이미 존재하는 자격증입니다. 다른 자격증을 추가해주세요.";
      return { errorMessage };
    }

    const id = uuidv4();

    const newCertificate = { id, ...obj };
    const createdCertificate = await Certificate.createCertificate({
      newCertificate,
    });
    createdCertificate.errorMessage = null;

    return createdCertificate;
  }

  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findAll({ user_id });
    if (!certificates) {
      const errorMessage = "해당 유저의 자격증 정보가 존재하지 않습니다.";
      return { errorMessage };
    }
    return certificates;
  }

  static async setCertificate({ certificate_id, toUpdate }) {
    let certificate = await Certificate.findOneById({ certificate_id });
    if (!certificate) {
      const errorMessage =
        "해당 자격증 정보를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      certificate = await Certificate.update({
        certificate_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.organization) {
      const fieldToUpdate = "organization";
      const newValue = toUpdate.organization;
      certificate = await Certificate.update({
        certificate_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.issue_date) {
      const fieldToUpdate = "issue_date";
      const newValue = toUpdate.issue_date;
      certificate = await Certificate.update({
        certificate_id,
        fieldToUpdate,
        newValue,
      });
    }
    certificate.errorMessage = null;
    return certificate;
  }

  static async deleteCertificate({ certificate_id }) {
    let isDeleted = await Certificate.deleteById({ certificate_id });
    if (!isDeleted) {
      const errorMessage = "삭제할 자격증 정보가 없습니다.";
      return { errorMessage };
    }
    return { result: "Success" };
  }
}

export { certificateService };
