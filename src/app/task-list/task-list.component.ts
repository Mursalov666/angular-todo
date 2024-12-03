import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

interface Task {
  id: number;
  description: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: Task[] = [];
  newTask = '';
  editingTask: Task | null = null;

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        id: Date.now(),
        description: this.newTask,
        completed: false,
        createdAt: new Date(),
      });
      this.newTask = '';
    }
  }

  openEditModal(task: Task) {
    this.editingTask = { ...task };
  }

  saveTask() {
    if (this.editingTask) {
      const index = this.tasks.findIndex((t) => t.id === this.editingTask?.id);
      if (index !== -1) this.tasks[index] = this.editingTask;
      this.editingTask = null;
    }
  }

  closeEditModal() {
    this.editingTask = null;
  }

  markCompleted(task: Task) {
    task.completed = true;
    this.saveToCompleted(task);
    this.deleteTask(task.id);
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  private saveToCompleted(task: Task) {
    const completedTasks = JSON.parse(
      localStorage.getItem('completedTasks') || '[]'
    );
    completedTasks.push(task);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }
}
