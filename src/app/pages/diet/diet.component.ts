import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DietLog } from '../../models/user.model';

@Component({
  selector: 'app-diet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Diet Planner</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Track your meals and monitor your nutrition intake.</p>
        </div>

        <!-- Daily Summary -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card text-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Calories</h3>
            <div class="text-3xl font-bold text-primary-600 mb-1">{{ todayCalories }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">/ {{ calorieGoal }} kcal</div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div class="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                   [style.width.%]="(todayCalories / calorieGoal) * 100"></div>
            </div>
          </div>

          <div class="card text-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Protein</h3>
            <div class="text-3xl font-bold text-secondary-600 mb-1">{{ todayProtein }}g</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">/ {{ proteinGoal }}g</div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div class="bg-secondary-500 h-2 rounded-full transition-all duration-300" 
                   [style.width.%]="(todayProtein / proteinGoal) * 100"></div>
            </div>
          </div>

          <div class="card text-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Carbs</h3>
            <div class="text-3xl font-bold text-accent-600 mb-1">{{ todayCarbs }}g</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">/ {{ carbsGoal }}g</div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div class="bg-accent-500 h-2 rounded-full transition-all duration-300" 
                   [style.width.%]="(todayCarbs / carbsGoal) * 100"></div>
            </div>
          </div>

          <div class="card text-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fat</h3>
            <div class="text-3xl font-bold text-red-600 mb-1">{{ todayFat }}g</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">/ {{ fatGoal }}g</div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div class="bg-red-500 h-2 rounded-full transition-all duration-300" 
                   [style.width.%]="(todayFat / fatGoal) * 100"></div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Meal Logging -->
          <div class="card">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Today's Meals</h3>
              <button (click)="openAddMealModal()" class="btn-primary">
                Add Meal
              </button>
            </div>

            <div class="space-y-4">
              <div *ngFor="let mealType of mealTypes" class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3 capitalize">{{ mealType }}</h4>
                
                <div *ngIf="getMealsForType(mealType).length === 0" class="text-gray-500 dark:text-gray-400 text-sm italic">
                  No meals logged yet
                </div>
                
                <div *ngFor="let meal of getMealsForType(mealType)" class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ meal.foodItem }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ meal.calories }} kcal</p>
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    P: {{ meal.protein }}g | C: {{ meal.carbs }}g | F: {{ meal.fat }}g
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Meal Suggestions -->
          <div class="card">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Meal Suggestions</h3>
            
            <div class="space-y-4">
              <div *ngFor="let suggestion of mealSuggestions" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-semibold text-gray-900 dark:text-white">{{ suggestion.name }}</h4>
                  <span class="text-sm px-2 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                    {{ suggestion.calories }} kcal
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ suggestion.description }}</p>
                <div class="flex justify-between items-center">
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Protein: {{ suggestion.protein }}g | Carbs: {{ suggestion.carbs }}g | Fat: {{ suggestion.fat }}g
                  </div>
                  <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Add to {{ suggestion.mealType }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Meal Modal -->
        <div *ngIf="showAddMealModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Meal</h3>
            <form (ngSubmit)="addMeal()">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meal Type
                  </label>
                  <select [(ngModel)]="newMeal.mealType" name="mealType" required class="input-field">
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Food Item
                  </label>
                  <input [(ngModel)]="newMeal.foodItem" name="foodItem" required class="input-field" placeholder="e.g., Grilled Chicken Breast">
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Calories
                    </label>
                    <input type="number" [(ngModel)]="newMeal.calories" name="calories" required class="input-field" placeholder="250">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Protein (g)
                    </label>
                    <input type="number" [(ngModel)]="newMeal.protein" name="protein" required class="input-field" placeholder="30">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Carbs (g)
                    </label>
                    <input type="number" [(ngModel)]="newMeal.carbs" name="carbs" required class="input-field" placeholder="15">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fat (g)
                    </label>
                    <input type="number" [(ngModel)]="newMeal.fat" name="fat" required class="input-field" placeholder="8">
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-3 mt-6">
                <button type="button" 
                        (click)="closeAddMealModal()"
                        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  Cancel
                </button>
                <button type="submit" class="btn-primary">
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DietComponent implements OnInit {
  todayMeals: DietLog[] = [];
  mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  
  // Daily totals
  todayCalories = 0;
  todayProtein = 0;
  todayCarbs = 0;
  todayFat = 0;

  // Daily goals
  calorieGoal = 2000;
  proteinGoal = 150;
  carbsGoal = 250;
  fatGoal = 65;

  showAddMealModal = false;
  newMeal: Partial<DietLog> = {
    mealType: 'breakfast',
    foodItem: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  mealSuggestions = [
    {
      name: 'Greek Yogurt Bowl',
      mealType: 'breakfast',
      description: 'Greek yogurt with berries, nuts, and honey',
      calories: 280,
      protein: 20,
      carbs: 25,
      fat: 12
    },
    {
      name: 'Quinoa Salad',
      mealType: 'lunch',
      description: 'Quinoa with mixed vegetables and chickpeas',
      calories: 350,
      protein: 15,
      carbs: 45,
      fat: 12
    },
    {
      name: 'Grilled Salmon',
      mealType: 'dinner',
      description: 'Grilled salmon with steamed broccoli and sweet potato',
      calories: 420,
      protein: 35,
      carbs: 30,
      fat: 18
    },
    {
      name: 'Mixed Nuts',
      mealType: 'snack',
      description: 'Handful of almonds, walnuts, and cashews',
      calories: 180,
      protein: 6,
      carbs: 8,
      fat: 16
    }
  ];

  ngOnInit() {
    this.loadTodayMeals();
    this.calculateDailyTotals();
  }

  loadTodayMeals() {
    // Mock data for today's meals
    this.todayMeals = [
      {
        id: '1',
        userId: 'mock-user',
        mealType: 'breakfast',
        foodItem: 'Oatmeal with Banana',
        calories: 300,
        protein: 8,
        carbs: 54,
        fat: 6,
        recordedAt: new Date()
      },
      {
        id: '2',
        userId: 'mock-user',
        mealType: 'lunch',
        foodItem: 'Chicken Caesar Salad',
        calories: 450,
        protein: 35,
        carbs: 15,
        fat: 28,
        recordedAt: new Date()
      }
    ];
  }

  calculateDailyTotals() {
    this.todayCalories = this.todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
    this.todayProtein = this.todayMeals.reduce((sum, meal) => sum + meal.protein, 0);
    this.todayCarbs = this.todayMeals.reduce((sum, meal) => sum + meal.carbs, 0);
    this.todayFat = this.todayMeals.reduce((sum, meal) => sum + meal.fat, 0);
  }

  getMealsForType(mealType: string): DietLog[] {
    return this.todayMeals.filter(meal => meal.mealType === mealType);
  }

  openAddMealModal() {
    this.showAddMealModal = true;
  }

  closeAddMealModal() {
    this.showAddMealModal = false;
    this.resetNewMeal();
  }

  addMeal() {
    if (this.newMeal.foodItem && this.newMeal.calories) {
      const meal: DietLog = {
        id: Date.now().toString(),
        userId: 'mock-user',
        mealType: this.newMeal.mealType as any,
        foodItem: this.newMeal.foodItem,
        calories: this.newMeal.calories,
        protein: this.newMeal.protein || 0,
        carbs: this.newMeal.carbs || 0,
        fat: this.newMeal.fat || 0,
        recordedAt: new Date()
      };

      this.todayMeals.push(meal);
      this.calculateDailyTotals();
      this.closeAddMealModal();
    }
  }

  private resetNewMeal() {
    this.newMeal = {
      mealType: 'breakfast',
      foodItem: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }
}