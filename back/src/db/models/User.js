import { UserModel } from "../schemas/user.js";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async addLike({ user_id, pressLikeUserId }) {
    const filter = { id: user_id };
    const update = {
      $inc: { likeCount: 1 },
      $addToSet: { likeUsers: pressLikeUserId },
    };
    const option = { returnOriginal: false };

    const AddLike = await UserModel.findOneAndUpdate(filter, update, option);
    return AddLike;
  }

  static async deleteLike({ user_id, pressLikeUserId }) {
    const filter = { id: user_id };
    const update = {
      $inc: { likeCount: -1 },
      $pull: { likeUsers: pressLikeUserId },
    };
    const option = { returnOriginal: false };

    const DeleteLike = await UserModel.findOneAndUpdate(filter, update, option);
    return DeleteLike;
  }
}

export { User };
