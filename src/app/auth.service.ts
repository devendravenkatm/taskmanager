import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Register User
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Login User
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Store JWT token
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve JWT token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Returns true if token exists
  }

  // Logout by removing the token
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Example of a protected API request
  getProtectedData(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : '');
    return this.http.get(`${this.baseUrl}/protected`, { headers })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); // Log error for debugging
    return throwError(errorMessage); // Throw an observable with a user-facing error message
  }
}
