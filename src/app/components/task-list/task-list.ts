import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="page-title mb-0">All Tasks</h2>
      <a routerLink="/tasks/new" class="btn btn-primary btn-sm px-3">
        <i class="bi bi-plus me-1"></i>New Task
      </a>
    </div>

    <!-- Stats Row -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3">
        <div class="flat-card p-3 text-center">
          <div style="font-size:1.5rem;font-weight:700;color:#0d9488;">{{ tasks.length }}</div>
          <div style="font-size:0.75rem;color:#64748b;font-weight:500;">Total</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="flat-card p-3 text-center">
          <div style="font-size:1.5rem;font-weight:700;color:#f59e0b;">{{ countByStatus('Pending') }}</div>
          <div style="font-size:0.75rem;color:#64748b;font-weight:500;">Pending</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="flat-card p-3 text-center">
          <div style="font-size:1.5rem;font-weight:700;color:#3b82f6;">{{ countByStatus('In Progress') }}</div>
          <div style="font-size:0.75rem;color:#64748b;font-weight:500;">In Progress</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="flat-card p-3 text-center">
          <div style="font-size:1.5rem;font-weight:700;color:#22c55e;">{{ countByStatus('Completed') }}</div>
          <div style="font-size:0.75rem;color:#64748b;font-weight:500;">Completed</div>
        </div>
      </div>
    </div>

    @if (tasks.length === 0) {
      <div class="flat-card p-5 text-center">
        <i class="bi bi-inbox" style="font-size:2.5rem;color:#cbd5e1;"></i>
        <p class="mt-3 mb-0" style="color:#94a3b8;">No tasks yet. Create your first task!</p>
        <a routerLink="/tasks/new" class="btn btn-primary btn-sm mt-3">
          <i class="bi bi-plus me-1"></i>Add Task
        </a>
      </div>
    } @else {
      <div class="flat-card overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr style="background:#f8fafc;">
                <th class="ps-4">Title</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th class="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
            @for (task of tasks; track task.id) {
  <tr>
    <td class="ps-4">
      <span style="font-weight:500;">{{ task.title }}</span>
    </td>
    <td style="color:#64748b;font-size:0.875rem;">
      <i class="bi bi-calendar3 me-1"></i>{{ task.dueDate }}
    </td>
    <td>
      <span class="badge rounded-pill px-2" [style]="getPriorityStyle(task.priority)">
        {{ task.priority }}
      </span>
    </td>
    <td>
      <span class="badge rounded-pill px-2" [style]="getStatusStyle(task.status)">
        {{ task.status }}
      </span>
    </td>
    <td class="text-end pe-4">
      <a [routerLink]="['/tasks', task.id]" class="btn btn-sm me-1"
         style="background:#f0fdfa;color:#0d9488;border:1px solid #ccfbf1;">
        <i class="bi bi-eye"></i>
      </a>
      <button (click)="onToggleStatus(task.id)" class="btn btn-sm me-1"
         style="background:#fefce8;color:#ca8a04;border:1px solid #fef08a;">
        <i class="bi bi-arrow-repeat"></i>
      </button>
      <button (click)="onDelete(task.id)" class="btn btn-sm"
         style="background:#fff1f2;color:#ef4444;border:1px solid #fecdd3;">
        <i class="bi bi-trash"></i>
      </button>
    </td>
  </tr>
}
            </tbody>
          </table>
        </div>
      </div>
    }
  `
})
export class TaskListComponent {
  private taskService = inject(TaskService);

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  countByStatus(status: string): number {
    return this.tasks.filter(t => t.status === status).length;
  }

  getPriorityBadge(priority: string): string {
    const map: Record<string, string> = {
      'High': 'badge',
      'Medium': 'badge',
      'Low': 'badge'
    };
    const styles: Record<string, string> = {
      'High': 'background:#fff1f2;color:#ef4444;',
      'Medium': 'background:#fefce8;color:#ca8a04;',
      'Low': 'background:#f0fdf4;color:#16a34a;'
    };
    return `badge rounded-pill px-2 py-1`;
  }

  getPriorityStyle(priority: string): string {
    const styles: Record<string, string> = {
      'High': 'background:#fff1f2;color:#ef4444;font-size:0.75rem;',
      'Medium': 'background:#fefce8;color:#ca8a04;font-size:0.75rem;',
      'Low': 'background:#f0fdf4;color:#16a34a;font-size:0.75rem;'
    };
    return styles[priority] ?? '';
  }

  getStatusBadge(status: string): string {
    return 'badge rounded-pill px-2 py-1';
  }

  onToggleStatus(id: number): void {
    this.taskService.toggleStatus(id);
  }
  getStatusStyle(status: string): string {
    const map: Record<string, string> = {
      'Pending': 'background:#f1f5f9;color:#475569;font-size:0.75rem;',
      'In Progress': 'background:#eff6ff;color:#3b82f6;font-size:0.75rem;',
      'Completed': 'background:#f0fdf4;color:#16a34a;font-size:0.75rem;'
    };
    return map[status] ?? '';
  }

  onDelete(id: number): void {
    if (confirm('Delete this task? This cannot be undone.')) {
      this.taskService.deleteTask(id);
    }
  }
}