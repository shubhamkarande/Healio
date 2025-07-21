export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthMetric {
  id: string;
  userId: string;
  weight: number; // in kg
  bmi: number;
  sleepHours: number;
  steps: number;
  waterIntake: number; // in liters
  recordedAt: Date;
}

export interface Goal {
  id: string;
  userId: string;
  type: 'weight' | 'steps' | 'sleep' | 'water' | 'exercise';
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  isCompleted: boolean;
  createdAt: Date;
}

export interface DietLog {
  id: string;
  userId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodItem: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  recordedAt: Date;
}

export interface AIRecommendation {
  id: string;
  userId: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'general';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  createdAt: Date;
}