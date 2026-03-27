import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (task) {
      <div class="row g-4">
        <div class="col-md-8">
          <div class="mb-4">
            <div class="form-label">Description</div>
            <p style="color:#1e293b;line-height:1.6;">
              {{ task.description || 'No description provided.' }}
            </p>
          </div>
          <div class="row g-3">
            <div class="col-6">
              <div class="form-label">Due Date</div>
              <div style="font-weight:500;">
                <i class="bi bi-calendar3 me-1 text-primary"></i>{{ task.dueDate }}
              </div>
            </div>
            <div class="col-6">
              <div class="form-label">Created</div>
              <div style="font-weight:500;color:#64748b;">{{ task.createdAt }}</div>
            </div>
            <div class="col-6">
              <div class="form-label">Priority</div>
              <span class="badge rounded-pill" [style]="getPriorityStyle(task.priority)">
                {{ task.priority }}
              </span>
            </div>
            <div class="col-6">
              <div class="form-label">Status</div>
              <span class="badge rounded-pill" [style]="getStatusStyle(task.status)">
                {{ task.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex gap-2 mt-4 pt-3" style="border-top:1px solid #e2e8f0;">
        <a [routerLink]="['../edit']" class="btn btn-primary btn-sm px-3">
          <i class="bi bi-pencil me-1"></i>Edit Task
        </a>
        <a routerLink="/tasks" class="btn btn-sm px-3"
           style="background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;">
          Back to List
        </a>
      </div>
    }
  `
})
export class TaskInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  task: Task | undefined;

  ngOnInit(): void {
    const id = Number(this.route.parent!.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
  }

  getPriorityStyle(p: string): string {
    const m: Record<string, string> = {
      'High': 'background:#fff1f2;color:#ef4444;',
      'Medium': 'background:#fefce8;color:#ca8a04;',
      'Low': 'background:#f0fdf4;color:#16a34a;'
    };
    return m[p] ?? '';
  }

  getStatusStyle(s: string): string {
    const m: Record<string, string> = {
      'Pending': 'background:#f1f5f9;color:#475569;',
      'In Progress': 'background:#eff6ff;color:#3b82f6;',
      'Completed': 'background:#f0fdf4;color:#16a34a;'
    };
    return m[s] ?? '';
  }
}