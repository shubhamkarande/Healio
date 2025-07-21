import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Goal } from '../../models/user.model';
import { HealthService } from '../../services/health.service';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Health Goals</h1>
              <p class="text-gray-600 dark:text-gray-400 mt-2">Set and track your wellness objectives.</p>
            </div>
            <button (click)="openAddGoalModal()" class="btn-primary">
              Add New Goal
            </button>
          </div>
        </div>

        <!-- Goals Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="card text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">{{ activeGoals }}</div>
            <div class="text-gray-600 dark:text-gray-400">Active Goals</div>
          </div>
          <div class="card text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ completedGoals }}</div>
            <div class="text-gray-600 dark:text-gray-400">Completed Goals</div>
          </div>
          <div class="card text-center">
            <div class="text-3xl font-bold text-secondary-600 mb-2">{{ averageProgress }}%</div>
            <div class="text-gray-600 dark:text-gray-400">Average Progress</div>
          </div>
        </div>

        <!-- Goals List -->
        <div class="grid gap-6">
          <div *ngFor="let goal of goals" class="card">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ goal.title }}</h3>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="text-sm px-2 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 capitalize">
                    {{ goal.type }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Due: {{ goal.deadline | date:'mediumDate' }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-xs px-2 py-1 rounded-full" 
                      [ngClass]="goal.isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'">
                  {{ goal.isCompleted ? 'Completed' : 'In Progress' }}
                </span>
                <button (click)="editGoal(goal)" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="mb-4">
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Progress</span>
                <span>{{ goal.currentValue }} / {{ goal.targetValue }} {{ goal.unit }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div class="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500" 
                     [style.width.%]="Math.min((goal.currentValue / goal.targetValue) * 100, 100)"></div>
              </div>
              <div class="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">
                {{ Math.round((goal.currentValue / goal.targetValue) * 100) }}%
              </div>
            </div>

            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Created {{ goal.createdAt | date:'shortDate' }}
              </div>
              <button (click)="updateProgress(goal)" 
                      [disabled]="goal.isCompleted"
                      class="text-primary-600 hover:text-primary-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                Update Progress
              </button>
            </div>
          </div>
        </div>

        <!-- Add Goal Modal -->
        <div *ngIf="showAddGoalModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {{ editingGoal ? 'Edit Goal' : 'Add New Goal' }}
            </h3>
            <form (ngSubmit)="saveGoal()">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Goal Type
                  </label>
                  <select [(ngModel)]="newGoal.type" name="type" required class="input-field">
                    <option value="weight">Weight</option>
                    <option value="steps">Daily Steps</option>
                    <option value="sleep">Sleep Hours</option>
                    <option value="water">Water Intake</option>
                    <option value="exercise">Exercise Minutes</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Goal Title
                  </label>
                  <input [(ngModel)]="newGoal.title" name="title" required class="input-field" placeholder="e.g., Lose 10kg">
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Value
                    </label>
                    <input type="number" [(ngModel)]="newGoal.targetValue" name="targetValue" required class="input-field" placeholder="70">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Value
                    </label>
                    <input type="number" [(ngModel)]="newGoal.currentValue" name="currentValue" required class="input-field" placeholder="75">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Unit
                  </label>
                  <input [(ngModel)]="newGoal.unit" name="unit" required class="input-field" placeholder="kg">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deadline
                  </label>
                  <input type="date" [(ngModel)]="newGoal.deadline" name="deadline" required class="input-field">
                </div>
              </div>

              <div class="flex justify-end space-x-3 mt-6">
                <button type="button" 
                        (click)="closeAddGoalModal()"
                        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  Cancel
                </button>
                <button type="submit" class="btn-primary">
                  {{ editingGoal ? 'Update Goal' : 'Create Goal' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Update Progress Modal -->
        <div *ngIf="showProgressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Progress</h3>
            <form (ngSubmit)="saveProgress()">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Value ({{ selectedGoal?.unit }})
                </label>
                <input type="number" 
                       [(ngModel)]="progressUpdate" 
                       name="progress"
                       required 
                       class="input-field"
                       [placeholder]="selectedGoal?.currentValue?.toString()">
              </div>
              <div class="flex justify-end space-x-3">
                <button type="button" 
                        (click)="closeProgressModal()"
                        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  Cancel
                </button>
                <button type="submit" class="btn-primary">
                  Update Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class GoalsComponent implements OnInit {
  goals: Goal[] = [];
  showAddGoalModal = false;
  showProgressModal = false;
  editingGoal: Goal | null = null;
  selectedGoal: Goal | null = null;
  progressUpdate = 0;

  // Make Math available in template
  Math = Math;

  newGoal: Partial<Goal> = {
    type: 'weight',
    title: '',
    targetValue: 0,
    currentValue: 0,
    unit: '',
    deadline: new Date(),
    isCompleted: false
  };

  activeGoals = 0;
  completedGoals = 0;
  averageProgress = 0;

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.loadGoals();
    this.calculateStats();
  }

  loadGoals() {
    this.goals = this.healthService.getMockGoals();
    
    // Add more mock goals for demonstration
    this.goals.push(
      {
        id: '3',
        userId: 'mock-user',
        type: 'water',
        title: 'Drink 3L water daily',
        targetValue: 3,
        currentValue: 2.5,
        unit: 'liters',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isCompleted: false,
        createdAt: new Date()
      },
      {
        id: '4',
        userId: 'mock-user',
        type: 'sleep',
        title: 'Get 8 hours of sleep',
        targetValue: 8,
        currentValue: 8,
        unit: 'hours',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isCompleted: true,
        createdAt: new Date()
      }
    );
  }

  calculateStats() {
    this.activeGoals = this.goals.filter(g => !g.isCompleted).length;
    this.completedGoals = this.goals.filter(g => g.isCompleted).length;
    
    const totalProgress = this.goals.reduce((sum, goal) => {
      return sum + Math.min((goal.currentValue / goal.targetValue) * 100, 100);
    }, 0);
    this.averageProgress = Math.round(totalProgress / this.goals.length);
  }

  openAddGoalModal() {
    this.showAddGoalModal = true;
    this.editingGoal = null;
  }

  closeAddGoalModal() {
    this.showAddGoalModal = false;
    this.resetNewGoal();
  }

  editGoal(goal: Goal) {
    this.editingGoal = goal;
    this.newGoal = { ...goal };
    this.showAddGoalModal = true;
  }

  saveGoal() {
    if (this.editingGoal) {
      // Update existing goal
      const index = this.goals.findIndex(g => g.id === this.editingGoal!.id);
      if (index !== -1) {
        this.goals[index] = { ...this.editingGoal, ...this.newGoal };
      }
    } else {
      // Add new goal
      const goal: Goal = {
        id: Date.now().toString(),
        userId: 'mock-user',
        type: this.newGoal.type as any,
        title: this.newGoal.title!,
        targetValue: this.newGoal.targetValue!,
        currentValue: this.newGoal.currentValue!,
        unit: this.newGoal.unit!,
        deadline: new Date(this.newGoal.deadline!),
        isCompleted: false,
        createdAt: new Date()
      };
      this.goals.push(goal);
    }
    
    this.calculateStats();
    this.closeAddGoalModal();
  }

  updateProgress(goal: Goal) {
    this.selectedGoal = goal;
    this.progressUpdate = goal.currentValue;
    this.showProgressModal = true;
  }

  closeProgressModal() {
    this.showProgressModal = false;
    this.selectedGoal = null;
    this.progressUpdate = 0;
  }

  saveProgress() {
    if (this.selectedGoal) {
      this.selectedGoal.currentValue = this.progressUpdate;
      
      // Check if goal is completed
      if (this.selectedGoal.currentValue >= this.selectedGoal.targetValue) {
        this.selectedGoal.isCompleted = true;
      }
      
      this.calculateStats();
      this.closeProgressModal();
    }
  }

  private resetNewGoal() {
    this.newGoal = {
      type: 'weight',
      title: '',
      targetValue: 0,
      currentValue: 0,
      unit: '',
      deadline: new Date(),
      isCompleted: false
    };
  }
}