import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Import Login Component
import { TaskListComponent } from './components/task-list/task-list.component'; // Your task list component
import { AuthGuard } from './auth.guard'; // Guard for protected routes

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root to login page
  { path: 'login', component: LoginComponent }, // Login page route
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] }, // Task list protected by auth guard
  { path: '**', redirectTo: '/login' } // Wildcard route, redirect to login if path not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
