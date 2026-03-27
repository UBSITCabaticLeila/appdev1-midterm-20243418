import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    @if (task) {
      <div class="d-flex align-items-center gap-2 mb-4">
        <a routerLink="/tasks" style="color:#64748b;text-decoration:none;font-size:0.875rem;">
          <i class="bi bi-arrow-left me-1"></i>Back
        </a>
        <span style="color:#cbd5e1;">/</span>
        <span class="page-title mb-0" style="font-size:1.25rem;">{{ task.title }}</span>
        <span class="badge rounded-pill ms-2" [style]="getStatusStyle(task.status)">
          {{ task.status }}
        </span>
      </div>

      <div class="flat-card">
        <div class="px-4 pt-3" style="border-bottom:1px solid #e2e8f0;">
          <ul class="nav nav-tabs border-0">
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['info']" routerLinkActive="active">
                <i class="bi bi-info-circle me-1"></i>Details
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['edit']" routerLinkActive="active">
                <i class="bi bi-pencil me-1"></i>Edit
              </a>
            </li>
          </ul>
        </div>
        <div class="p-4">
          <router-outlet></router-outlet>
        </div>
      </div>

    } @else {
      <div class="flat-card p-5 text-center">
        <i class="bi bi-exclamation-circle" style="font-size:2rem;color:#ef4444;"></i>
        <p class="mt-3" style="color:#64748b;">Task not found.</p>
        <a routerLink="/tasks" class="btn btn-primary btn-sm">Back to Tasks</a>
      </div>
    }
  `
})
export class TaskDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  task: Task | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) { alert('Invalid task ID.'); return; }
    this.task = this.taskService.getTaskById(id);
    if (!this.task) alert(`No task found with ID: ${id}`);
  }

  getStatusStyle(status: string): string {
    const map: Record<string, string> = {
      'Pending': 'background:#f1f5f9;color:#475569;font-size:0.75rem;',
      'In Progress': 'background:#eff6ff;color:#3b82f6;font-size:0.75rem;',
      'Completed': 'background:#f0fdf4;color:#16a34a;font-size:0.75rem;'
    };
    return map[status] ?? '';
  }
}