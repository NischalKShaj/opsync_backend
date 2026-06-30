import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

export function createTaskRoutes(controller: TaskController): Router {
  const router = Router();

  router.post('/', (req, res) => controller.create(req, res));

  return router;
}
