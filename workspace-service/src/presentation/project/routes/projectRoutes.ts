import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';

export function createProjectRoutes(controller: ProjectController): Router {
  const router = Router();

  router.post('/', (req, res) => controller.create(req, res));

  return router;
}
