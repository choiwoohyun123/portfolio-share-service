import { CertificateModel } from "../schemas/certificate.js";

class Certificate {
  static async createCertificate({ newCertificate }) {
    const createdNewCertificate = CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findOneById({ certificate_id }) {
    const certificate = await CertificateModel.findOne({ id: certificate_id });
    return certificate;
  }

  static async update({ certificate_id, fieldToUpdate, newValue }) {
    const filter = { id: certificate_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async deleteById({ certificate_id }) {
    const deletedCertificate = await CertificateModel.deleteOne({ id: certificate_id });
    const isCompleteDeleted = deletedCertificate.deletedCount === 1;
    return isCompleteDeleted;
  }

  static async findByObj({
    user_id,
    name,
    organization,
    issue_date,
  }) {
    const findCertificate = await CertificateModel.findOne({
      user_id,
      name,
      organization,
      issue_date,
    });
    return findCertificate;
  }

  static async findAll({ user_id }) {
    const certificates = await CertificateModel.find({ user_id: user_id });
    return certificates;
  }
}

export { Certificate };
