import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">H</span>
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-white">Healio</span>
            </a>
          </div>

          <div class="hidden md:flex items-center space-x-8" *ngIf="isAuthenticated">
            <a routerLink="/dashboard" 
               routerLinkActive="nav-active"
               class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              Dashboard
            </a>
            <a routerLink="/diet" 
               routerLinkActive="nav-active"
               class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              Diet Planner
            </a>
            <a routerLink="/goals" 
               routerLinkActive="nav-active"
               class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              Goals
            </a>
            <a routerLink="/tips" 
               routerLinkActive="nav-active"
               class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              Health Tips
            </a>
            <a routerLink="/settings" 
               routerLinkActive="nav-active"
               class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              Settings
            </a>
          </div>

          <div class="flex items-center space-x-4">
            <button (click)="toggleDarkMode()" 
                    class="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
              <svg *ngIf="!isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <svg *ngIf="isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </button>

            <div *ngIf="!isAuthenticated" class="flex items-center space-x-4">
              <a routerLink="/login" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium">Login</a>
              <a routerLink="/signup" class="btn-primary">Sign Up</a>
            </div>

            <div *ngIf="isAuthenticated" class="relative">
              <button (click)="toggleUserMenu()" 
                      class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
                <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">U</span>
                </div>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <div *ngIf="showUserMenu" 
                   class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                <a routerLink="/settings" 
                   class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </a>
                <button (click)="logout()" 
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div *ngIf="isAuthenticated" class="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a routerLink="/dashboard" 
             routerLinkActive="nav-active"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600">
            Dashboard
          </a>
          <a routerLink="/diet" 
             routerLinkActive="nav-active"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600">
            Diet Planner
          </a>
          <a routerLink="/goals" 
             routerLinkActive="nav-active"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600">
            Goals
          </a>
          <a routerLink="/tips" 
             routerLinkActive="nav-active"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600">
            Health Tips
          </a>
        </div>
      </div>
    </nav>
  `
})
export class NavigationComponent implements OnInit {
  isAuthenticated = false;
  showUserMenu = false;
  isDarkMode = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    // Check for saved dark mode preference
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.applyDarkMode();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyDarkMode();
  }

  private applyDarkMode() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
    this.showUserMenu = false;
  }
}