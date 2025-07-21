import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <div class="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
            <span class="text-white font-bold text-2xl">H</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">Sign in to your Healio account</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div *ngIf="error" class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {{ error }}
          </div>

          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input id="email" 
                     name="email" 
                     type="email" 
                     [(ngModel)]="email"
                     required 
                     class="input-field"
                     placeholder="Enter your email">
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input id="password" 
                     name="password" 
                     type="password" 
                     [(ngModel)]="password"
                     required 
                     class="input-field"
                     placeholder="Enter your password">
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember" name="remember" type="checkbox" 
                     class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
              <label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>

          <button type="submit" 
                  [disabled]="isLoading"
                  class="w-full btn-primary flex items-center justify-center">
            <span *ngIf="isLoading" class="spinner mr-2"></span>
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>

          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account? 
              <a routerLink="/signup" class="text-primary-600 hover:text-primary-500 font-medium">
                Sign up here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      const { data, error } = await this.authService.signIn(this.email, this.password);
      
      if (error) {
        this.error = error.message;
      } else if (data.user) {
        this.router.navigate(['/dashboard']);
      }
    } catch (err) {
      this.error = 'An unexpected error occurred';
    } finally {
      this.isLoading = false;
    }
  }
}