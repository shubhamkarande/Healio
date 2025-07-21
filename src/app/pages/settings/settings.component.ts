import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your account and preferences.</p>
        </div>

        <div class="space-y-8">
          <!-- Profile Settings -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>
            <form (ngSubmit)="saveProfile()" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input [(ngModel)]="profile.firstName" name="firstName" class="input-field" placeholder="John">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input [(ngModel)]="profile.lastName" name="lastName" class="input-field" placeholder="Doe">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input type="email" [(ngModel)]="profile.email" name="email" class="input-field" placeholder="john@example.com">
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (cm)
                  </label>
                  <input type="number" [(ngModel)]="profile.height" name="height" class="input-field" placeholder="175">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select [(ngModel)]="profile.gender" name="gender" class="input-field">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input type="date" [(ngModel)]="profile.dateOfBirth" name="dateOfBirth" class="input-field">
                </div>
              </div>

              <button type="submit" class="btn-primary">
                Save Profile
              </button>
            </form>
          </div>

          <!-- Health Goals -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Health Goals & Targets</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Daily Calorie Goal
                </label>
                <input type="number" [(ngModel)]="healthGoals.calories" class="input-field" placeholder="2000">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Daily Steps Goal
                </label>
                <input type="number" [(ngModel)]="healthGoals.steps" class="input-field" placeholder="10000">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sleep Goal (hours)
                </label>
                <input type="number" step="0.5" [(ngModel)]="healthGoals.sleep" class="input-field" placeholder="8">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Water Intake Goal (liters)
                </label>
                <input type="number" step="0.1" [(ngModel)]="healthGoals.water" class="input-field" placeholder="2.5">
              </div>
            </div>
            <button (click)="saveHealthGoals()" class="btn-primary mt-4">
              Save Goals
            </button>
          </div>

          <!-- Notification Settings -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notifications</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">Daily Reminders</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Get reminded to log your health metrics</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [(ngModel)]="notifications.dailyReminders" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">Goal Achievements</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Celebrate when you reach your goals</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [(ngModel)]="notifications.goalAchievements" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">Weekly Reports</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Receive weekly health progress summaries</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [(ngModel)]="notifications.weeklyReports" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">AI Recommendations</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Get personalized health tips and suggestions</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [(ngModel)]="notifications.aiRecommendations" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
            <button (click)="saveNotifications()" class="btn-primary mt-4">
              Save Preferences
            </button>
          </div>

          <!-- Privacy & Security -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
            <div class="space-y-4">
              <button class="w-full text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-medium text-gray-900 dark:text-white">Change Password</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>

              <button class="w-full text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-medium text-gray-900 dark:text-white">Download Data</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Export your health data</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </button>

              <button class="w-full text-left p-4 border border-red-200 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors text-red-600">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-medium">Delete Account</h3>
                    <p class="text-sm text-red-500">Permanently delete your account and all data</p>
                  </div>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- App Preferences -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">App Preferences</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [(ngModel)]="preferences.darkMode" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Measurement Units
                </label>
                <select [(ngModel)]="preferences.units" class="input-field">
                  <option value="metric">Metric (kg, cm)</option>
                  <option value="imperial">Imperial (lbs, ft)</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select [(ngModel)]="preferences.language" class="input-field">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
            <button (click)="savePreferences()" class="btn-primary mt-4">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    height: 175,
    gender: 'male',
    dateOfBirth: '1990-01-01'
  };

  healthGoals = {
    calories: 2000,
    steps: 10000,
    sleep: 8,
    water: 2.5
  };

  notifications = {
    dailyReminders: true,
    goalAchievements: true,
    weeklyReports: true,
    aiRecommendations: true
  };

  preferences = {
    darkMode: false,
    units: 'metric',
    language: 'en'
  };

  ngOnInit() {
    // Load saved preferences
    this.preferences.darkMode = localStorage.getItem('darkMode') === 'true';
  }

  saveProfile() {
    // Save profile logic here
    console.log('Profile saved:', this.profile);
  }

  saveHealthGoals() {
    // Save health goals logic here
    console.log('Health goals saved:', this.healthGoals);
  }

  saveNotifications() {
    // Save notification preferences logic here
    console.log('Notifications saved:', this.notifications);
  }

  savePreferences() {
    // Save app preferences logic here
    localStorage.setItem('darkMode', this.preferences.darkMode.toString());
    
    // Apply dark mode immediately
    if (this.preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    console.log('Preferences saved:', this.preferences);
  }
}