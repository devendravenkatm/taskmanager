import { Component} from '@angular/core';

interface Task {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTask: string = '';
  tasks: Task[] = [];
  nextId: number = 1;
  title = 'client';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ id: this.nextId++, name: this.newTask });
      this.newTask = '';
    }
  }

  editTask(task: Task) {
    const newName = prompt('Edit Task Name:', task.name);
    if (newName !== null && newName.trim()) {
      task.name = newName;
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
