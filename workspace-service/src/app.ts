import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { WorkspaceController } from './presentation/workspace/controllers/WorkspaceController';
import { TeamController } from './presentation/team/controllers/TeamController';
import { ProjectController } from './presentation/project/controllers/ProjectController';
import { TaskController } from './presentation/task/controllers/TaskController';
import { createWorkspaceRoutes } from './presentation/workspace/routes/workspaceRoutes';
import { createTeamRoutes } from './presentation/team/routes/teamRoutes';
import { createProjectRoutes } from './presentation/project/routes/projectRoutes';
import { createTaskRoutes } from './presentation/task/routes/taskRoutes';
import { WorkspaceRepository } from './infrastructure/repositories/WorkspaceRepository';
import { TeamRepository } from './infrastructure/repositories/TeamRepository';
import { ProjectRepository } from './infrastructure/repositories/ProjectRepository';
import { TaskRepository } from './infrastructure/repositories/TaskRepository';
import { RoleRepository } from './infrastructure/repositories/RoleRepository';
import { ActivityLogRepository } from './infrastructure/repositories/ActivityLogRepository';
import { CreateWorkspace } from './application/use-cases/workspace/CreateWorkspace';
import { GetWorkspace } from './application/use-cases/workspace/GetWorkspace';
import { UpdateWorkspace } from './application/use-cases/workspace/UpdateWorkspace';
import { DeleteWorkspace } from './application/use-cases/workspace/DeleteWorkspace';
import { ListWorkspaces } from './application/use-cases/workspace/ListWorkspaces';
import { AddMember } from './application/use-cases/workspace/AddMember';
import { CreateTeam } from './application/use-cases/team/CreateTeam';
import { CreateProject } from './application/use-cases/project/CreateProject';
import { CreateTask } from './application/use-cases/task/CreateTask';

export function createApp() {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize repositories
  const workspaceRepository = new WorkspaceRepository();
  const teamRepository = new TeamRepository();
  const projectRepository = new ProjectRepository();
  const taskRepository = new TaskRepository();
  const roleRepository = new RoleRepository();
  const activityLogRepository = new ActivityLogRepository();

  // Initialize use cases
  const createWorkspace = new CreateWorkspace(workspaceRepository, activityLogRepository);
  const getWorkspace = new GetWorkspace(workspaceRepository);
  const updateWorkspace = new UpdateWorkspace(workspaceRepository, activityLogRepository);
  const deleteWorkspace = new DeleteWorkspace(workspaceRepository, activityLogRepository);
  const listWorkspaces = new ListWorkspaces(workspaceRepository);
  const addMember = new AddMember(workspaceRepository, activityLogRepository);
  const createTeam = new CreateTeam(teamRepository, activityLogRepository);
  const createProject = new CreateProject(projectRepository, teamRepository, activityLogRepository);
  const createTask = new CreateTask(taskRepository, projectRepository, teamRepository, activityLogRepository);

  // Initialize controllers
  const workspaceController = new WorkspaceController(
    createWorkspace,
    getWorkspace,
    updateWorkspace,
    deleteWorkspace,
    listWorkspaces,
    addMember
  );
  const teamController = new TeamController(createTeam);
  const projectController = new ProjectController(createProject);
  const taskController = new TaskController(createTask);

  // Routes
  app.use('/workspaces', createWorkspaceRoutes(workspaceController));
  app.use('/teams', createTeamRoutes(teamController));
  app.use('/projects', createProjectRoutes(projectController));
  app.use('/tasks', createTaskRoutes(taskController));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'workspace-service' });
  });

  return app;
}
