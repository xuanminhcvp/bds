import api from "./api";
import { ProjectCreate, ProjectResponse, Project } from "frontend/src/types/project";
import { ProjectFilterSlice } from "../slices/projectFilterSlice";

export const createProjectAPI = async (project: ProjectCreate) => {
    return await api.post<ProjectResponse>('/project/', project);
};

export const fetchProjectAPI = async (filterProject?: ProjectFilterSlice['filterProject']) => {
  const params: Record<string, any> = {};
  if (!filterProject) {
    return await api.get('/project');
  }
  if (filterProject.status) params.status = filterProject.status;
  if (filterProject.area.min !== null) params.area_min = filterProject.area.min;
  if (filterProject.area.max !== null) params.area_max = filterProject.area.max;
  if (filterProject.address) params.address = filterProject.address;
  if (filterProject.created_at) params.created_at = filterProject.created_at;

  return await api.get('/project', { params });
};

export const updateProjectAPI = async (
  project_id: number,
  updatedProject: Partial<ProjectResponse>
) => {
  return await api.post<ProjectResponse>(`/project/${project_id}`, updatedProject);
};

export const deleteProjectAPI = async (project_id: number) => {
  return await api.delete(`/project/${project_id}`);
};

export const getProjectByIdAPI = async (project_id: number) => {
  return await api.get<ProjectResponse>(`/project/${project_id}`);
};

export const getProjectByUserAPI = async () => {
  return await api.get<ProjectResponse[]>('/project/me');
};

export const extendProjectAPI = async (
  project_id: number,
  days: number
) => {
  return await api.post<ProjectResponse>(`/project/${project_id}/extend`, { days });
};

export const updateProjectStatusAPI = async (
  project_id: number
) => {
  return await api.post<ProjectResponse>(`/project/${project_id}/status`);
};


