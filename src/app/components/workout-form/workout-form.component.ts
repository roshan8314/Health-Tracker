import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { WORKOUT_TYPES } from '../../models/workout.model';

@Component({
  selector: 'app-workout-form',
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Add Workout</h2>
      <form [formGroup]="workoutForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">User Name</label>
          <input
            type="text"
            formControlName="userName"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <div *ngIf="workoutForm.get('userName')?.errors?.['required'] && workoutForm.get('userName')?.touched" 
               class="text-red-500 text-sm mt-1">
            User name is required
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Workout Type</label>
          <select
            formControlName="workoutType"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a workout type</option>
            <option *ngFor="let type of workoutTypes" [value]="type">
              {{type}}
            </option>
          </select>
          <div *ngIf="workoutForm.get('workoutType')?.errors?.['required'] && workoutForm.get('workoutType')?.touched"
               class="text-red-500 text-sm mt-1">
            Workout type is required
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Minutes</label>
          <input
            type="number"
            formControlName="minutes"
            min="1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <div *ngIf="workoutForm.get('minutes')?.errors?.['required'] && workoutForm.get('minutes')?.touched"
               class="text-red-500 text-sm mt-1">
            Minutes are required
          </div>
          <div *ngIf="workoutForm.get('minutes')?.errors?.['min'] && workoutForm.get('minutes')?.touched"
               class="text-red-500 text-sm mt-1">
            Minutes must be greater than 0
          </div>
        </div>

        <button
          type="submit"
          [disabled]="!workoutForm.valid"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Add Workout
        </button>
      </form>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  workoutTypes = WORKOUT_TYPES;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    this.workoutForm = this.fb.group({
      userName: ['', Validators.required],
      workoutType: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const { userName, workoutType, minutes } = this.workoutForm.value;
      this.workoutService.addWorkout(userName, {
        type: workoutType,
        minutes: minutes
      });
      this.workoutForm.reset();
    }
  }
}