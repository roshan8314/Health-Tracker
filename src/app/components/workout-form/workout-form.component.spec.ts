import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../../services/workout.service';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutService', ['addWorkout']);
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, WorkoutFormComponent],
      providers: [
        { provide: WorkoutService, useValue: spy }
      ]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with invalid form', () => {
    expect(component.workoutForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.workoutForm;
    expect(form.controls['userName'].errors?.['required']).toBeTruthy();
    expect(form.controls['workoutType'].errors?.['required']).toBeTruthy();
    expect(form.controls['minutes'].errors?.['required']).toBeTruthy();
  });

  it('should validate minutes must be positive', () => {
    const minutesControl = component.workoutForm.controls['minutes'];
    minutesControl.setValue(-1);
    expect(minutesControl.errors?.['min']).toBeTruthy();
  });

  it('should call workoutService.addWorkout when form is valid', () => {
    const testData = {
      userName: 'Test User',
      workoutType: 'Running',
      minutes: 30
    };

    component.workoutForm.setValue(testData);
    expect(component.workoutForm.valid).toBeTruthy();

    component.onSubmit();

    expect(workoutService.addWorkout).toHaveBeenCalledWith(
      testData.userName,
      { type: testData.workoutType, minutes: testData.minutes }
    );
  });
});