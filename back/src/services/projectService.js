import { User, Project } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";

class projectService {
  static async addProject({
    user_id,
    title,
    start_date,
    end_date,
    description,
  }) {
    // DB에 해당 user_id가 존재할 경우,
    // 먼저, DB에서 해당 유저의 프로젝트 정보를 확인해서, 만약 추가하려는 프로젝트 정보가 이미 DB에 존재할 경우
    const obj = { user_id, title, start_date, end_date, description };

    const find_project = await Project.findByObj(obj);
    if (find_project) {
      const errorMessage =
        "이미 존재하는 학적입니다. 다른 학적을 추가해주세요.";
      return { errorMessage };
    }

    // DB에 추가하려는 프로젝트 정보가 없다면, 새로 추가 가능
    const id = uuidv4();
    const newProject = { id, ...obj };
    const createdProject = await Project.createProject({ newProject });
    createdProject.errorMessage = null;

    return createdProject;
  }

  static async getProjects({ user_id }) {
    const projects = await Project.findAll({ user_id });
    if (!projects) {
      const errorMessage = "해당 유저의 학적 정보가 존재하지 않습니다.";
      return { errorMessage };
    }
    return projects;
  }

  static async setProject({ project_id, toUpdate }) {
    let project = await Project.findOneById({ project_id });
    if (!project) {
      const errorMessage =
        "해당 학력 정보를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.start_date) {
      const fieldToUpdate = "start_date";
      const newValue = toUpdate.start_date;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.end_date) {
      const fieldToUpdate = "end_date";
      const newValue = toUpdate.end_date;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    project.errorMessage = null;
    return project;
  }

  static async deleteProject({ project_id }) {
    let isDeleted = await Project.deleteById({ project_id });
    if (!isDeleted) {
      const errorMessage = "삭제할 프로젝트 정보가 없습니다.";
      return { errorMessage };
    }
    return { result: "Success" };
  }
}

export { projectService };
