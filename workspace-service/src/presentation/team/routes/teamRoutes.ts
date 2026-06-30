import { Router } from 'express';
import { TeamController } from '../controllers/TeamController';

export function createTeamRoutes(controller: TeamController): Router {
  const router = Router();

  router.post('/', (req, res) => controller.create(req, res));

  return router;
}
