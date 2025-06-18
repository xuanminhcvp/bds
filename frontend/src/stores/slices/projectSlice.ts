import { StateCreator } from 'zustand';
import { createProjectAPI, fetchProjectAPI, updateProjectAPI, deleteProjectAPI, getProjectByIdAPI, getProjectByUserAPI,extendProjectAPI, updateProjectStatusAPI } from "../services/projectService";
import { ProjectCreate, ProjectResponse, Project } from '../../types/project';
import { ProjectFilterSlice } from './projectFilterSlice';

export interface ProjectSlice {
    userproject: Project[];
    projects: ProjectResponse[];
    projectDetail: ProjectResponse | null;
    isLoadingProjects: boolean;
    errorProjects: string | null;
    isFetchedProjects: boolean;
    createProject: (project: ProjectCreate) => Promise<void>;
    fetchProjects: (filter?: ProjectFilterSlice['filterProject']) => Promise<void>;
    updateProject: (project_id: number, updatedProject: Partial<Project>) => Promise<void>;
    deleteProject: (project_id: number) => Promise<void>;
    getProjectById: (project_id: number) => Promise<void>;
    getProjectByUser: () => Promise<void>;
    extendProject: (project_id: number, days: number) => Promise<void>;
    updateProjectStatus: (project_id: number) => Promise<void>;
}

const projectSlice: StateCreator<ProjectSlice> = (set, get) => ({
    userproject: [],
    projects: [],
    projectDetail: null,
    isLoadingProjects: false,
    errorProjects: null,
    isFetchedProjects: false,
    createProject: async (project: ProjectCreate) => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
            const { data } = await createProjectAPI(project);
            set((state) => ({
                projects: [...state.projects, data],
                userproject: [...state.userproject, data],
                isLoadingProjects: false,
                isFetchedProjects: true,
            }));
        } catch (error: any) {
            set({
                isLoadingProjects: false,
                errorProjects: error.response?.data?.message || 'Create project failed',
            });
        }
    },
    fetchProjects: async (filterProject) => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
            const response = await fetchProjectAPI(filterProject);
            set({
                projects: response.data.result,
                isLoadingProjects: false,
                isFetchedProjects: true,
            });
        } catch (error: any) {
            set({
                isLoadingProjects: false,
                errorProjects: error.response?.data?.message || 'Fetch projects failed',
            });
        }
    },
    updateProject: async (project_id: number, updatedProject: Partial<Project>) => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
            const { data } = await updateProjectAPI(project_id, updatedProject);
            set((state) => ({
                projects: state.projects.map((project) =>
                    project.project_id === project_id ? { ...project, ...data } : project
                ),
                userproject: state.userproject.map((project) =>
                    project.project_id === project_id ? { ...project, ...data } : project
                ),
                isLoadingProjects: false,
            }));
        } catch (error: any) {
            set({
                isLoadingProjects: false,
                errorProjects: error.response?.data?.message || 'Update project failed',
            });
        }
    },
    deleteProject: async (project_id: number) => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
            await deleteProjectAPI(project_id);
            set((state) => ({
                projects: state.projects.filter((project) => project.project_id !== project_id),
                userproject: state.userproject.filter((project) => project.project_id !== project_id),
                isLoadingProjects: false,
            }));
        } catch (error: any) {
            set({
                isLoadingProjects: false,
                errorProjects: error.response?.data?.message || 'Delete project failed',
            });
        }
    },
    getProjectById: async (project_id: number) => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
            const { data } = await getProjectByIdAPI(project_id);
            set({
                projectDetail: data,
                isFetchedProjects: true,
                isLoadingProjects: false,
            });
        } catch (error: any) {
            set({
                isLoadingProjects: false,
                errorProjects: error.response?.data?.message || 'Get project by ID failed',
            });
        }
    },
    getProjectByUser: async () => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
            const { data } = await getProjectByUserAPI();
            set({
                userproject: data,
                projects: data,
                isLoadingProjects: false,
                isFetchedProjects: true,
            });
        } catch (error: any) {
            set({
                isLoadingProjects: false,
                errorProjects: error.response?.data?.message || 'Get projects by user failed',
            });
        }
    },
    extendProject: async (project_id: number, days: number) => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
            const { data } = await extendProjectAPI(project_id, days);
            set((state) => ({
                userproject: state.userproject.map((item) =>
                    item.project_id === project_id
                        ? {
                            ...item,
                            expires_at: new Date(
                                new Date(item.expires_at).setDate(
                                    new Date(item.expires_at).getDate() + days
                                )
                            ).toISOString(),
                        }
                        : item
                ),
            }));
        } catch (error: any) {
            set({
                isLoadingProjects: false,
                errorProjects: error.response?.data?.message || 'Extend project failed',
            });
        }
    },
    updateProjectStatus: async (project_id: number) => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
            await updateProjectStatusAPI(project_id);
            set((state) => ({
                projects: state.projects.map((project) =>
                    project.project_id === project_id ? { ...project, is_approved: true } : project
                ),
                isLoadingProjects: false,
            }));
        } catch (error: any) {
            set({
                isLoadingProjects: false,
                errorProjects: error.response?.data?.message || 'Update project status failed',
            });
        }
    },
});

export default projectSlice;