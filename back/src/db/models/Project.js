import { ProjectModel } from "../schemas/project.js";

class Project {
  // 새로운 프로젝트 정보 생성
  static async createProject({ newProject }) {
    const createdNewProject = ProjectModel.create(newProject);
    return createdNewProject;
  }

  // project_id에 해당하는 프로젝트 조회
  static async findOneById({ project_id }) {
    const project = await ProjectModel.findOne({ id: project_id });
    return project;
  }

  // project_id에 해당하는 정보를 업데이트
  static async update({ project_id, fieldToUpdate, newValue }) {
    // id가 project_id인 프로젝트 정보를 찾는다.
    const filter = { id: project_id };
    // 업데이트할 필드와 값으로 update 객체를 만든다.
    const update = { [fieldToUpdate]: newValue };
    // 업데이트된 프로젝트 정보를 반환하기 위해 returnOriginal: false 옵션을 사용
    const option = { returnOriginal: false };

    // 교육 정보를 업데이트하고, 업데이트된 교육 정보를 반환한다.
    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  // project_id에 해당하는 프로젝트 정보를 삭제하는 메서드
  static async deleteById({ project_id }) {
    // id가 project_id인 프로젝트 정보를 찾아서 삭제하고, 삭제한 프로젝트 정보를 반환한다.
    const deletedProject = await ProjectModel.deleteOne({ id: project_id });
    const isCompleteDeleted = deletedProject.deletedCount === 1;
    return isCompleteDeleted;
  }

  // 추가! obj정보가 포함된 정보를 반환해주는 함수 (하나의 정보만 반환)
  static async findByObj({ user_id, title, start_date, end_date, description }) {
    const findProject = await ProjectModel.findOne({
      user_id,
      title,
      start_date,
      end_date,
      description
    });
    return findProject;
  }

  // 추가! user_id가 가지고 있는 모든 프로젝트 정보들을 반환해주는 함수 (여러 정보를 반환할 수 있음)
  static async findAll({ user_id }) {
    const projects = await ProjectModel.find({ user_id: user_id });
    return projects;
  }
}

export { Project };
