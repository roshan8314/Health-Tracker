import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WorkoutFormComponent } from './app/components/workout-form/workout-form.component';
import { WorkoutListComponent } from './app/components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './app/components/workout-chart/workout-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    WorkoutFormComponent,
    WorkoutListComponent,
    WorkoutChartComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Health Challenge Tracker</h1>
      </header>
      
      <div class="max-w-7xl mx-auto">
        <app-workout-form></app-workout-form>
        <app-workout-list></app-workout-list>
        <app-workout-chart></app-workout-chart>
      </div>
    </div>
  `
})
export class App {
  name = 'Health Challenge Tracker';
}

bootstrapApplication(App, {
  providers: [
    provideAnimations()
  ]
});