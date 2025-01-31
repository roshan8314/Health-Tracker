import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { WorkoutService } from '../../services/workout.service';
import { User, WORKOUT_TYPES } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Workout List</h2>
        <div class="flex gap-4">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Search by username"
            class="px-3 py-2 border rounded-md"
          />
          <select
            [(ngModel)]="selectedWorkoutType"
            class="px-3 py-2 border rounded-md"
          >
            <option value="">All workout types</option>
            <option *ngFor="let type of workoutTypes" [value]="type">
              {{type}}
            </option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workouts</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Workouts</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Minutes</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let user of filteredUsers | slice:startIndex:endIndex">
              <td class="px-6 py-4 whitespace-nowrap">{{user.name}}</td>
              <td class="px-6 py-4">
                <div *ngFor="let workout of user.workouts">
                  {{workout.type}} - {{workout.minutes}} minutes
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{user.workouts.length}}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{getTotalMinutes(user)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <mat-paginator
        [length]="filteredUsers.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="[5, 10, 25]"
        (page)="onPageChange($event)"
        class="mt-4"
      >
      </mat-paginator>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  workoutTypes = WORKOUT_TYPES;
  searchTerm = '';
  selectedWorkoutType = '';
  pageSize = 5;
  currentPage = 0;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getUsers().subscribe(users => {
      this.users = users;
      this.filterUsers();
    });
  }

  get startIndex(): number {
    return this.currentPage * this.pageSize;
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  getTotalMinutes(user: User): number {
    return user.workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const typeMatch = !this.selectedWorkoutType || 
        user.workouts.some(w => w.type === this.selectedWorkoutType);
      return nameMatch && typeMatch;
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}