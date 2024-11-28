import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: Task[] = [];
  newTask = '';
  editingTask: Task | null = null;

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ id: Date.now(), description: this.newTask, completed: false });
      this.newTask = '';
    }
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
  }

  saveTask() {
    if (this.editingTask) {
      const index = this.tasks.findIndex(t => t.id === this.editingTask?.id);
      if (index !== -1) this.tasks[index] = this.editingTask;
      this.editingTask = null;
    }
  }

  markCompleted(task: Task) {
    task.completed = true;
    this.saveToCompleted(task);
    this.deleteTask(task.id);
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  private saveToCompleted(task: Task) {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    completedTasks.push(task);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }
}
