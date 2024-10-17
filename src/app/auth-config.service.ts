import { Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  tokenEndpoint: 'http://localhost:3000/api/auth/login', // Replace with your backend login endpoint
  clientId: 'task-manager-client', // Optional client ID for your app
  responseType: 'token',
  scope: 'openid profile email', // Customize the scope if needed
  oidc: false // Set to false for simple JWT-based auth
};

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {
  getAuthConfig() {
    return authConfig;
  }
}
