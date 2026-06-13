export class TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    taskId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.taskId = data.taskId;
    this.userId = data.userId;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
