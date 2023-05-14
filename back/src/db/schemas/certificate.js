import pkg from 'mongoose';
const { Schema, model } = pkg;

const CertificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    issue_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   transform: function(ret) {
    //     ret.start_date = ret.start_date.toString().slice(0, 10);
    //     ret.end_date = ret.end_date.toString().slice(0, 10);
    //     return ret;
    //   }
    // }
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
