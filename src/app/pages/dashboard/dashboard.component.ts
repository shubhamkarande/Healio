import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { HealthService } from '../../services/health.service';
import { HealthMetric, Goal } from '../../models/user.model';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Health Dashboard</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's your health overview.</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Current Weight</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentMetrics?.weight || 75 }}kg</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">BMI</p>
                <p class="text-2xl font-bold" [ngClass]="getBMIStatus(currentMetrics?.bmi || 22.5).color">
                  {{ currentMetrics?.bmi || 22.5 }}
                </p>
                <p class="text-xs" [ngClass]="getBMIStatus(currentMetrics?.bmi || 22.5).color">
                  {{ getBMIStatus(currentMetrics?.bmi || 22.5).status }}
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Steps Today</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentMetrics?.steps || 8500 }}</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Sleep Hours</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentMetrics?.sleepHours || 7.5 }}h</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts and Goals -->
        <div class="grid lg:grid-cols-2 gap-8 mb-8">
          <!-- Weight Progress Chart -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weight Progress</h3>
            <div class="chart-container">
              <canvas #weightChart id="weightChart"></canvas>
            </div>
          </div>

          <!-- Recent Goals -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Goals</h3>
            <div class="space-y-4">
              <div *ngFor="let goal of recentGoals" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ goal.title }}</h4>
                  <span class="text-xs px-2 py-1 rounded-full" 
                        [ngClass]="goal.isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'">
                    {{ goal.isCompleted ? 'Completed' : 'In Progress' }}
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                  <div class="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                       [style.width.%]="(goal.currentValue / goal.targetValue) * 100"></div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ goal.currentValue }} / {{ goal.targetValue }} {{ goal.unit }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button (click)="openLogWeightModal()" class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors">
              <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <p class="text-sm text-gray-600 dark:text-gray-400">Log Weight</p>
            </button>
            
            <button class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors">
              <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <p class="text-sm text-gray-600 dark:text-gray-400">Log Sleep</p>
            </button>
            
            <button class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors">
              <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
              </svg>
              <p class="text-sm text-gray-600 dark:text-gray-400">Log Water</p>
            </button>
            
            <button class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors">
              <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-gray-600 dark:text-gray-400">Log Exercise</p>
            </button>
          </div>
        </div>

        <!-- Weight Log Modal -->
        <div *ngIf="showWeightModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Log Your Weight</h3>
            <form (ngSubmit)="logWeight()">
              <div class="mb-4">
                <label for="weight" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input id="weight" 
                       type="number" 
                       step="0.1"
                       [(ngModel)]="newWeight"
                       name="weight"
                       required 
                       class="input-field"
                       placeholder="75.0">
              </div>
              <div class="flex justify-end space-x-3">
                <button type="button" 
                        (click)="closeWeightModal()"
                        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  Cancel
                </button>
                <button type="submit" class="btn-primary">
                  Save Weight
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentMetrics: HealthMetric | null = null;
  recentGoals: Goal[] = [];
  showWeightModal = false;
  newWeight = 0;
  
  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.loadHealthData();
    this.loadGoals();
    setTimeout(() => this.createWeightChart(), 100);
  }

  loadHealthData() {
    // For now, use mock data
    const mockData = this.healthService.getMockHealthData();
    this.currentMetrics = mockData[0];
  }

  loadGoals() {
    this.recentGoals = this.healthService.getMockGoals();
  }

  getBMIStatus(bmi: number) {
    return this.healthService.getBMIStatus(bmi);
  }

  openLogWeightModal() {
    this.showWeightModal = true;
    this.newWeight = this.currentMetrics?.weight || 75;
  }

  closeWeightModal() {
    this.showWeightModal = false;
    this.newWeight = 0;
  }

  logWeight() {
    if (this.newWeight > 0 && this.currentMetrics) {
      this.currentMetrics.weight = this.newWeight;
      this.currentMetrics.bmi = this.healthService.calculateBMI(this.newWeight, 175); // Mock height
      this.closeWeightModal();
      this.createWeightChart(); // Refresh chart
    }
  }

  createWeightChart() {
    const canvas = document.getElementById('weightChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Mock weight data for the past 30 days
    const dates = [];
    const weights = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      weights.push(75 + Math.random() * 2 - 1); // Random variation around 75kg
    }

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Weight (kg)',
          data: weights,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(156, 163, 175, 0.2)'
            }
          },
          x: {
            grid: {
              color: 'rgba(156, 163, 175, 0.2)'
            }
          }
        }
      }
    });
  }
}