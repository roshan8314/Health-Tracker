import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-chart',
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 class="text-2xl font-bold mb-4">Workout Progress</h2>
      <canvas baseChart
        [data]="chartData"
        [type]="'bar'"
        [options]="chartOptions">
      </canvas>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule
  ]
})
export class WorkoutChartComponent implements OnChanges {
  @Input() workouts: Workout[] = [];

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Minutes per Workout Type'
    }]
  };

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  ngOnChanges(): void {
    this.updateChartData();
  }

  private updateChartData(): void {
    const workoutsByType = new Map<string, number>();
    
    this.workouts.forEach(workout => {
      const current = workoutsByType.get(workout.type) || 0;
      workoutsByType.set(workout.type, current + workout.minutes);
    });

    this.chartData = {
      labels: Array.from(workoutsByType.keys()),
      datasets: [{
        data: Array.from(workoutsByType.values()),
        label: 'Minutes per Workout Type',
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }]
    };
  }
}