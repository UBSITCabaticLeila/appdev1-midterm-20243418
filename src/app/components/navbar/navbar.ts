import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg bg-white border-bottom" style="border-color: #e2e8f0 !important;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2 fw-700" routerLink="/tasks">
          <div style="width:32px;height:32px;background:#0d9488;border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <i class="bi bi-check2-square text-white" style="font-size:1rem;"></i>
          </div>
          <span style="font-weight:700;color:#0d9488;font-size:1.1rem;">TaskFlow</span>
        </a>

        <button class="navbar-toggler border-0" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto gap-1">
            <li class="nav-item">
              <a class="nav-link px-3 py-2 rounded"
                 routerLink="/tasks"
                 routerLinkActive="active-nav"
                 [routerLinkActiveOptions]="{ exact: true }"
                 style="font-size:0.875rem;font-weight:500;color:#64748b;">
                <i class="bi bi-list-task me-1"></i>Tasks
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 py-2 rounded"
                 routerLink="/tasks/new"
                 routerLinkActive="active-nav"
                 style="font-size:0.875rem;font-weight:500;color:#64748b;">
                <i class="bi bi-plus me-1"></i>New Task
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <style>
      .active-nav {
        background-color: #f0fdfa !important;
        color: #0d9488 !important;
      }
    </style>
  `
})
export class NavbarComponent {}