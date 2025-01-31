import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User, Workout } from '../models/workout.model';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add workout to existing user', (done) => {
    const newWorkout: Workout = {
      type: 'Running',
      minutes: 45
    };

    service.getUsers().subscribe(users => {
      const initialLength = users[0].workouts.length;
      
      service.addWorkout('John Doe', newWorkout);
      
      service.getUsers().subscribe(updatedUsers => {
        const user = updatedUsers.find(u => u.name === 'John Doe');
        expect(user?.workouts.length).toBe(initialLength + 1);
        expect(user?.workouts).toContain(newWorkout);
        done();
      });
    });
  });

  it('should create new user when adding workout for non-existing user', (done) => {
    const newWorkout: Workout = {
      type: 'Yoga',
      minutes: 60
    };

    service.getUsers().subscribe(users => {
      const initialUsersCount = users.length;
      
      service.addWorkout('New User', newWorkout);
      
      service.getUsers().subscribe(updatedUsers => {
        expect(updatedUsers.length).toBe(initialUsersCount + 1);
        const newUser = updatedUsers.find(u => u.name === 'New User');
        expect(newUser).toBeTruthy();
        expect(newUser?.workouts).toContain(newWorkout);
        done();
      });
    });
  });

  it('should handle case-insensitive usernames', (done) => {
    const newWorkout: Workout = {
      type: 'Running',
      minutes: 30
    };

    service.addWorkout('JOHN DOE', newWorkout);

    service.getUsers().subscribe(users => {
      const user = users.find(u => u.name === 'John Doe');
      expect(user).toBeTruthy();
      expect(user?.workouts).toContain(newWorkout);
      done();
    });
  });

  it('should return empty array for non-existing user workouts', () => {
    const workouts = service.getUserWorkouts('Non Existing User');
    expect(workouts).toEqual([]);
  });
});