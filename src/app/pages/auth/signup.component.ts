import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <div class="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
            <span class="text-white font-bold text-2xl">H</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">Start your health journey with Healio</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div *ngIf="error" class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {{ error }}
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <input id="firstName" 
                       name="firstName" 
                       type="text" 
                       [(ngModel)]="firstName"
                       required 
                       class="input-field"
                       placeholder="John">
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <input id="lastName" 
                       name="lastName" 
                       type="text" 
                       [(ngModel)]="lastName"
                       required 
                       class="input-field"
                       placeholder="Doe">
              </div>
            </div>

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
                     placeholder="john@example.com">
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
                     placeholder="Create a secure password">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="height" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input id="height" 
                       name="height" 
                       type="number" 
                       [(ngModel)]="height"
                       required 
                       class="input-field"
                       placeholder="175">
              </div>
              <div>
                <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select id="gender" 
                        name="gender" 
                        [(ngModel)]="gender"
                        required 
                        class="input-field">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date of Birth
              </label>
              <input id="dateOfBirth" 
                     name="dateOfBirth" 
                     type="date" 
                     [(ngModel)]="dateOfBirth"
                     required 
                     class="input-field">
            </div>
          </div>

          <div class="flex items-center">
            <input id="terms" name="terms" type="checkbox" 
                   [(ngModel)]="agreeToTerms"
                   required
                   class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
            <label for="terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a> 
              and <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" 
                  [disabled]="isLoading || !agreeToTerms"
                  class="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
            <span *ngIf="isLoading" class="spinner mr-2"></span>
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>

          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Already have an account? 
              <a routerLink="/login" class="text-primary-600 hover:text-primary-500 font-medium">
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  height = '';
  gender = '';
  dateOfBirth = '';
  agreeToTerms = false;
  isLoading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.validateForm()) return;

    this.isLoading = true;
    this.error = '';

    try {
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        height: parseInt(this.height),
        gender: this.gender,
        dateOfBirth: this.dateOfBirth
      };

      const { data, error } = await this.authService.signUp(this.email, this.password, userData);
      
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

  private validateForm(): boolean {
    if (!this.firstName || !this.lastName || !this.email || !this.password || 
        !this.height || !this.gender || !this.dateOfBirth) {
      this.error = 'Please fill in all fields';
      return false;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return false;
    }

    if (!this.agreeToTerms) {
      this.error = 'Please agree to the terms and conditions';
      return false;
    }

    return true;
  }
}