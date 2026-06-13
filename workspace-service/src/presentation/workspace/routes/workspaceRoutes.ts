import { Router } from 'express';
import { WorkspaceController } from '../controllers/WorkspaceController';

export function createWorkspaceRoutes(controller: WorkspaceController): Router {
  const router = Router();

  router.post('/', (req, res) => controller.create(req, res));
  router.get('/', (req, res) => controller.list(req, res));
  router.get('/:id', (req, res) => controller.getById(req, res));
  router.patch('/:id', (req, res) => controller.update(req, res));
  router.delete('/:id', (req, res) => controller.delete(req, res));
  router.post('/:id/members', (req, res) => controller.addMember(req, res));

  return router;
}
