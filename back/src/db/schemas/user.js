import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,   // 기본키 설정
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
    likeUsers: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
  {_id: false}  // _id 필드가 기본키로 설정되는 것을 방지
);

const UserModel = model("User", UserSchema);

export { UserModel };
