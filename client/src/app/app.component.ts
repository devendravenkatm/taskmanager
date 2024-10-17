import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTask: string = '';
  isLoggedIn: boolean = false;
  showModal: boolean = true; // Controls the visibility of the modal
  showRegister: boolean = false;
  showLogin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check if the user is logged in
    this.isLoggedIn = this.authService.isAuthenticated();
    this.showModal = !this.isLoggedIn;
  }

  // Close the modal and continue without login/register
  closeModal() {
    this.showModal = false;
  }

  // Add a new task
  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask });
      this.newTask = '';
    }
  }

  // Edit a task
  editTask(task: any) {
    const updatedName = prompt('Edit task name:', task.name);
    if (updatedName !== null && updatedName.trim()) {
      task.name = updatedName.trim();
    }
  }

  // Delete a task
  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  // Logout method
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.showModal = true; // Show the modal again after logout
  }
}
