import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (task) {
      @if (showSuccess) {
        <div class="alert border-0 mb-4"
             style="background:#f0fdf4;color:#16a34a;border-left:4px solid #22c55e !important;border-radius:6px;">
          <i class="bi bi-check-circle me-2"></i>Task updated! Redirecting...
        </div>
      }
      @if (showError) {
        <div class="alert border-0 mb-4 d-flex justify-content-between align-items-center"
             style="background:#fff1f2;color:#ef4444;border-left:4px solid #ef4444 !important;border-radius:6px;">
          <span><i class="bi bi-exclamation-circle me-2"></i>Title and due date are required.</span>
          <button class="btn-close btn-close-sm" (click)="showError = false"></button>
        </div>
      }

      <div class="row">
        <div class="col-md-9">
          <div class="mb-4">
            <label class="form-label">Task Title <span style="color:#ef4444;">*</span></label>
            <input type="text" class="form-control"
                   [(ngModel)]="task.title"
                   placeholder="Task title" />
          </div>

          <div class="mb-4">
            <label class="form-label">Description</label>
            <textarea class="form-control"
                      [(ngModel)]="task.description"
                      rows="3"
                      placeholder="Task description"></textarea>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <label class="form-label">Due Date <span style="color:#ef4444;">*</span></label>
              <input type="date" class="form-control"
                     [(ngModel)]="task.dueDate" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Priority</label>
              <select class="form-select" [(ngModel)]="task.priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Status</label>
              <select class="form-select" [(ngModel)]="task.status">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div class="d-flex gap-2 pt-2" style="border-top:1px solid #e2e8f0;">
            <button (click)="onSave()" class="btn btn-primary px-4">
              <i class="bi bi-save me-1"></i>Save Changes
            </button>
            <button (click)="onCancel()" class="btn btn-sm px-4"
                    style="background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;">
              Cancel
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class TaskEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);

  task: Task | undefined;
  showSuccess = false;
  showError = false;

  ngOnInit(): void {
    const id = Number(this.route.parent!.snapshot.paramMap.get('id'));
    const found = this.taskService.getTaskById(id);
    if (found) this.task = { ...found };
  }

  onSave(): void {
    if (!this.task?.title?.trim() || !this.task?.dueDate) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.taskService.updateTask(this.task!);
    this.showSuccess = true;
    setTimeout(() => this.router.navigate(['/tasks', this.task!.id, 'info']), 1200);
  }

  onCancel(): void {
    this.router.navigate(['/tasks', this.task!.id, 'info']);
  }
}