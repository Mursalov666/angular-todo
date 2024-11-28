import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [NgFor],
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css'],
})
export class CompletedTasksComponent {
  completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
}
