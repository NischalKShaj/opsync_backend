export class CreateTaskDTO {
  projectId: string;
  title: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'review' | 'completed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  dueDate?: Date;

  constructor(data: {
    projectId: string;
    title: string;
    description?: string;
    status?: 'todo' | 'in_progress' | 'review' | 'completed';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    assigneeId?: string;
    dueDate?: Date;
  }) {
    this.projectId = data.projectId;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status || 'todo';
    this.priority = data.priority || 'medium';
    this.assigneeId = data.assigneeId;
    this.dueDate = data.dueDate;
  }
}
