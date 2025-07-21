import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { HealthMetric, Goal, DietLog, AIRecommendation } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private supabase: SupabaseClient;
  private healthMetricsSubject = new BehaviorSubject<HealthMetric[]>([]);
  public healthMetrics$ = this.healthMetricsSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      'https://your-project.supabase.co',
      'your-anon-key'
    );
  }

  // Health Metrics
  async addHealthMetric(metric: Omit<HealthMetric, 'id'>) {
    const { data, error } = await this.supabase
      .from('health_metrics')
      .insert([metric])
      .select();
    return { data, error };
  }

  async getHealthMetrics(userId: string) {
    const { data, error } = await this.supabase
      .from('health_metrics')
      .select('*')
      .eq('userId', userId)
      .order('recordedAt', { ascending: false });
    
    if (data) {
      this.healthMetricsSubject.next(data);
    }
    return { data, error };
  }

  // Goals
  async addGoal(goal: Omit<Goal, 'id'>) {
    const { data, error } = await this.supabase
      .from('goals')
      .insert([goal])
      .select();
    return { data, error };
  }

  async getGoals(userId: string) {
    const { data, error } = await this.supabase
      .from('goals')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    return { data, error };
  }

  async updateGoal(goalId: string, updates: Partial<Goal>) {
    const { data, error } = await this.supabase
      .from('goals')
      .update(updates)
      .eq('id', goalId)
      .select();
    return { data, error };
  }

  // Diet Logs
  async addDietLog(dietLog: Omit<DietLog, 'id'>) {
    const { data, error } = await this.supabase
      .from('diet_logs')
      .insert([dietLog])
      .select();
    return { data, error };
  }

  async getDietLogs(userId: string, date?: Date) {
    let query = this.supabase
      .from('diet_logs')
      .select('*')
      .eq('userId', userId);
    
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      query = query
        .gte('recordedAt', startDate.toISOString())
        .lte('recordedAt', endDate.toISOString());
    }
    
    const { data, error } = await query.order('recordedAt', { ascending: false });
    return { data, error };
  }

  // AI Recommendations
  async getAIRecommendations(userId: string) {
    const { data, error } = await this.supabase
      .from('ai_recommendations')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(10);
    return { data, error };
  }

  // Calculate BMI
  calculateBMI(weight: number, height: number): number {
    return Number((weight / Math.pow(height / 100, 2)).toFixed(1));
  }

  // Get BMI status
  getBMIStatus(bmi: number): { status: string, color: string } {
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { status: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { status: 'Overweight', color: 'text-yellow-600' };
    return { status: 'Obese', color: 'text-red-600' };
  }

  // Mock data for development
  getMockHealthData(): HealthMetric[] {
    return [
      {
        id: '1',
        userId: 'mock-user',
        weight: 75,
        bmi: 22.5,
        sleepHours: 7.5,
        steps: 8500,
        waterIntake: 2.2,
        recordedAt: new Date()
      }
    ];
  }

  getMockGoals(): Goal[] {
    return [
      {
        id: '1',
        userId: 'mock-user',
        type: 'weight',
        title: 'Lose 5kg',
        targetValue: 70,
        currentValue: 75,
        unit: 'kg',
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        isCompleted: false,
        createdAt: new Date()
      },
      {
        id: '2',
        userId: 'mock-user',
        type: 'steps',
        title: 'Walk 10,000 steps daily',
        targetValue: 10000,
        currentValue: 8500,
        unit: 'steps',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isCompleted: false,
        createdAt: new Date()
      }
    ];
  }

  getMockRecommendations(): AIRecommendation[] {
    return [
      {
        id: '1',
        userId: 'mock-user',
        category: 'nutrition',
        title: 'Increase Protein Intake',
        description: 'Based on your current activity level, consider adding more lean protein to support muscle recovery.',
        priority: 'medium',
        isRead: false,
        createdAt: new Date()
      },
      {
        id: '2',
        userId: 'mock-user',
        category: 'exercise',
        title: 'Add Strength Training',
        description: 'Your cardio routine is great! Adding 2 strength training sessions per week could help reach your weight goals faster.',
        priority: 'high',
        isRead: false,
        createdAt: new Date()
      }
    ];
  }
}