import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Design UI Mockups',
      description: 'Create wireframes and mockups for the new dashboard interface.',
      dueDate: '2025-07-15',
      status: 'In Progress',
      priority: 'High',
      createdAt: '2025-06-01'
    },
    {
      id: 2,
      title: 'Set Up Database',
      description: 'Configure PostgreSQL and create all initial table schemas.',
      dueDate: '2025-07-10',
      status: 'Completed',
      priority: 'Medium',
      createdAt: '2025-06-02'
    },
    {
      id: 3,
      title: 'Write Unit Tests',
      description: 'Write unit tests for all service methods and components.',
      dueDate: '2025-07-20',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2025-06-03'
    }
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.tasks.push(newTask);
  }

  updateTask(updated: Task): void {
    const index = this.tasks.findIndex(t => t.id === updated.id);
    if (index !== -1) {
      this.tasks[index] = { ...updated };
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  toggleStatus(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      const cycle: Task['status'][] = ['Pending', 'In Progress', 'Completed'];
      const currentIndex = cycle.indexOf(task.status);
      task.status = cycle[(currentIndex + 1) % cycle.length];
    }
  }
}