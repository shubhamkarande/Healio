import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <!-- Hero Section -->
      <section class="relative py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Your Journey to 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Better Health
              </span>
              <br>Starts Here
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
              Healio combines AI-powered insights with intuitive tracking to help you achieve your wellness goals. 
              Monitor your progress, get personalized recommendations, and transform your health journey.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <a routerLink="/signup" class="btn-primary">
                Start Your Journey
              </a>
              <a routerLink="/login" class="btn-secondary">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Optimal Health
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive health tracking with intelligent insights to guide your wellness journey.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let feature of features" class="card text-center hover:transform hover:scale-105 transition-all duration-300">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <div [innerHTML]="feature.icon" class="w-8 h-8 text-white"></div>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-white mb-12">
              Join Thousands on Their Health Journey
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
              <div *ngFor="let stat of stats" class="text-center">
                <div class="text-4xl font-bold text-white mb-2">{{ stat.value }}</div>
                <div class="text-primary-100">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join Healio today and start your personalized wellness journey with AI-powered insights.
          </p>
          <a routerLink="/signup" class="btn-primary text-lg px-8 py-4">
            Get Started Free
          </a>
        </div>
      </section>
    </div>
  `
})
export class LandingComponent {
  features = [
    {
      title: 'Smart Health Tracking',
      description: 'Monitor weight, BMI, sleep, steps, and more with intelligent data insights.',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>'
    },
    {
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations based on your health data and goals.',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
    },
    {
      title: 'Diet Planning',
      description: 'Plan meals, track calories, and maintain a balanced nutrition profile.',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>'
    },
    {
      title: 'Goal Setting',
      description: 'Set achievable health goals and track your progress over time.',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    },
    {
      title: 'Visual Progress',
      description: 'Beautiful charts and graphs to visualize your health journey.',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'
    },
    {
      title: 'Mobile Friendly',
      description: 'Access your health data anywhere with our responsive design.',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"></path></svg>'
    }
  ];

  stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '1M+', label: 'Health Records' },
    { value: '95%', label: 'Goal Achievement' }
  ];
}