import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true; // Show loading spinner
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/']); // Navigate to the task manager page on success
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Invalid username or password'; // Display error message
          console.error('Login failed', error);
        }
      );
    }
  }
}
