import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AIRecommendation } from '../../models/user.model';
import { HealthService } from '../../services/health.service';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Health Tips & Recommendations</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">AI-powered insights based on your health data and goals.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="mb-8">
          <div class="border-b border-gray-200 dark:border-gray-700">
            <nav class="-mb-px flex space-x-8">
              <button *ngFor="let category of categories"
                      (click)="selectedCategory = category"
                      [class]="selectedCategory === category ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                      class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors">
                {{ category }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Health Score Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="card text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">85</div>
            <div class="text-gray-600 dark:text-gray-400">Health Score</div>
            <div class="text-sm text-green-600 mt-1">↗ +5 this week</div>
          </div>
          <div class="card text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ filteredRecommendations.length }}</div>
            <div class="text-gray-600 dark:text-gray-400">Active Tips</div>
          </div>
          <div class="card text-center">
            <div class="text-4xl font-bold text-secondary-600 mb-2">{{ readRecommendations }}</div>
            <div class="text-gray-600 dark:text-gray-400">Tips Applied</div>
          </div>
        </div>

        <!-- Recommendations List -->
        <div class="space-y-6">
          <div *ngFor="let recommendation of filteredRecommendations" 
               class="card hover:shadow-lg transition-shadow duration-300"
               [class.border-l-4]="true"
               [class.border-green-500]="recommendation.priority === 'high'"
               [class.border-yellow-500]="recommendation.priority === 'medium'"
               [class.border-blue-500]="recommendation.priority === 'low'">
            
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-full flex items-center justify-center"
                     [ngClass]="getCategoryIcon(recommendation.category).bgClass">
                  <div [innerHTML]="getCategoryIcon(recommendation.category).icon" 
                       [ngClass]="getCategoryIcon(recommendation.category).iconClass"></div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ recommendation.title }}</h3>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs px-2 py-1 rounded-full capitalize"
                          [ngClass]="getPriorityClass(recommendation.priority)">
                      {{ recommendation.priority }} priority
                    </span>
                    <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 capitalize">
                      {{ recommendation.category }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <button *ngIf="!recommendation.isRead"
                        (click)="markAsRead(recommendation)"
                        class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Mark as Read
                </button>
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ recommendation.description }}</p>

            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-500 dark:text-gray-400">
                {{ recommendation.createdAt | date:'mediumDate' }}
              </span>
              <div class="flex space-x-2">
                <button class="text-green-600 hover:text-green-700 font-medium">
                  Apply Tip
                </button>
                <button class="text-gray-500 hover:text-gray-700">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No recommendations message -->
        <div *ngIf="filteredRecommendations.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No tips available</h3>
          <p class="text-gray-600 dark:text-gray-400">Check back later for new personalized recommendations.</p>
        </div>
      </div>
    </div>
  `
})
export class TipsComponent implements OnInit {
  recommendations: AIRecommendation[] = [];
  categories = ['all', 'nutrition', 'exercise', 'sleep', 'general'];
  selectedCategory = 'all';
  readRecommendations = 0;

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.loadRecommendations();
  }

  loadRecommendations() {
    this.recommendations = this.healthService.getMockRecommendations();
    
    // Add more mock recommendations
    this.recommendations.push(
      {
        id: '3',
        userId: 'mock-user',
        category: 'sleep',
        title: 'Optimize Your Sleep Schedule',
        description: 'Your sleep data shows irregular bedtimes. Try going to bed and waking up at the same time every day, even on weekends, to improve sleep quality.',
        priority: 'high',
        isRead: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        userId: 'mock-user',
        category: 'general',
        title: 'Stay Hydrated',
        description: 'You\'re doing great with your water intake! Keep drinking water throughout the day to maintain optimal hydration levels.',
        priority: 'low',
        isRead: true,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000)
      },
      {
        id: '5',
        userId: 'mock-user',
        category: 'nutrition',
        title: 'Add More Fiber',
        description: 'Consider adding more fruits, vegetables, and whole grains to your diet to reach the recommended daily fiber intake of 25-35g.',
        priority: 'medium',
        isRead: false,
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000)
      }
    );

    this.readRecommendations = this.recommendations.filter(r => r.isRead).length;
  }

  get filteredRecommendations(): AIRecommendation[] {
    if (this.selectedCategory === 'all') {
      return this.recommendations;
    }
    return this.recommendations.filter(r => r.category === this.selectedCategory);
  }

  markAsRead(recommendation: AIRecommendation) {
    recommendation.isRead = true;
    this.readRecommendations = this.recommendations.filter(r => r.isRead).length;
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  }

  getCategoryIcon(category: string) {
    const icons = {
      nutrition: {
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.704 2.704 0 004.5 16c-.523 0-1.046-.151-1.5-.454M3 12l8-8 8 8M7 12h10v4a4 4 0 01-4 4H7v-8z"></path></svg>',
        bgClass: 'bg-green-100 dark:bg-green-900',
        iconClass: 'text-green-600'
      },
      exercise: {
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
        bgClass: 'bg-blue-100 dark:bg-blue-900',
        iconClass: 'text-blue-600'
      },
      sleep: {
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>',
        bgClass: 'bg-purple-100 dark:bg-purple-900',
        iconClass: 'text-purple-600'
      },
      general: {
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',
        bgClass: 'bg-orange-100 dark:bg-orange-900',
        iconClass: 'text-orange-600'
      }
    };
    
    return icons[category as keyof typeof icons] || icons.general;
  }
}