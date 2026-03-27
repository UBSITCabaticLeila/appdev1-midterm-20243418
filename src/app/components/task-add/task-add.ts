import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="row justify-content-center">
      <div class="col-lg-7 col-md-9">

        <div class="d-flex align-items-center gap-2 mb-4">
          <a routerLink="/tasks" style="color:#64748b;text-decoration:none;font-size:0.875rem;">
            <i class="bi bi-arrow-left me-1"></i>Back
          </a>
          <span style="color:#cbd5e1;">/</span>
          <h2 class="page-title mb-0">New Task</h2>
        </div>

        @if (showSuccess) {
          <div class="alert border-0 mb-4"
               style="background:#f0fdf4;color:#16a34a;border-left:4px solid #22c55e !important;border-radius:6px;">
            <i class="bi bi-check-circle me-2"></i>Task added! Redirecting...
          </div>
        }
        @if (showError) {
          <div class="alert border-0 mb-4 d-flex justify-content-between align-items-center"
               style="background:#fff1f2;color:#ef4444;border-left:4px solid #ef4444 !important;border-radius:6px;">
            <span><i class="bi bi-exclamation-circle me-2"></i>Title and due date are required.</span>
            <button class="btn-close btn-close-sm" (click)="showError = false"></button>
          </div>
        }

        <div class="flat-card p-4">
          <div class="mb-4">
            <label class="form-label">Task Title <span style="color:#ef4444;">*</span></label>
            <input type="text" class="form-control"
                   [(ngModel)]="newTask.title"
                   placeholder="What needs to be done?" />
          </div>

          <div class="mb-4">
            <label class="form-label">Description</label>
            <textarea class="form-control"
                      [(ngModel)]="newTask.description"
                      rows="3"
                      placeholder="Add details about this task..."></textarea>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <label class="form-label">Due Date <span style="color:#ef4444;">*</span></label>
              <input type="date" class="form-control"
                     [(ngModel)]="newTask.dueDate" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Priority</label>
              <select class="form-select" [(ngModel)]="newTask.priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Status</label>
              <select class="form-select" [(ngModel)]="newTask.status">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div class="d-flex gap-2 pt-2" style="border-top:1px solid #e2e8f0;">
            <button (click)="onAdd()" class="btn btn-primary px-4">
              <i class="bi bi-plus me-1"></i>Add Task
            </button>
            <a routerLink="/tasks" class="btn btn-sm px-4"
               style="background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;">
              Cancel
            </a>
          </div>
        </div>

      </div>
    </div>
  `
})
export class TaskAddComponent {
  private taskService = inject(TaskService);
  private router = inject(Router);

  showSuccess = false;
  showError = false;

  newTask: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Medium'
  };

  onAdd(): void {
    if (!this.newTask.title.trim() || !this.newTask.dueDate) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.taskService.addTask(this.newTask);
    this.showSuccess = true;
    setTimeout(() => this.router.navigate(['/tasks']), 1200);
  }
}