export class Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'review' | 'completed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assigneeId?: string;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.projectId = data.projectId;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.priority = data.priority;
    this.assigneeId = data.assigneeId;
    this.dueDate = data.dueDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
