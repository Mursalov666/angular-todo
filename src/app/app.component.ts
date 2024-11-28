import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, TaskListComponent, CompletedTasksComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentView: 'tasks' | 'completed' = 'tasks';
}
