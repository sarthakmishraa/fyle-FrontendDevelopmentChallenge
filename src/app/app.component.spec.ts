import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // workout component tests

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users by name', () => {
    component.nameFilter = 'Jane';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Jane Smith');
  });

  it('should filter users by workout type', () => {
    component.workoutType = 'Cycling';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(8); // John Doe and Mike Johnson
  });

  it('should clear filters', () => {
    component.clearFilters();
    expect(component.nameFilter).toBe('');
    expect(component.workoutType).toBe('');
  });

  it('should paginate users', () => {
    component.currentPage = 1;
    component.itemsPerPage = 5;
    component.filteredUsers = component.userData.slice();
    let paginatedUsers = component.paginatedUsers;
    expect(paginatedUsers.length).toBe(5); // First 5 users

    component.nextPage();
    paginatedUsers = component.paginatedUsers;
    expect(paginatedUsers.length).toBe(5); // Second page

    component.previousPage();
    paginatedUsers = component.paginatedUsers;
    expect(paginatedUsers.length).toBe(5); // Back to first 5 users
  });

  // workout service tests

  it('should add a workout', () => {
    component.name = 'Test User';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.addWorkout();

    expect(component.userData[12].name).toBe('Test User');
    expect(component.userData[12].workouts[0].type).toBe('Running');
    expect(component.userData[12].workouts[0].minutes).toBe(30);
  });

  it('should reset local storage', () => {
    spyOn(localStorage, 'clear').and.callFake(() => {});
    component.resetLocalStorage();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(component.userData.length).toBe(0);
  });

  it('should calculate total workout minutes correctly', () => {
    const user = component.userData[0]; // John Doe
    const totalMinutes = component.getTotalUserWorkoutMinutes(user);
    expect(totalMinutes).toBe(75); // 30 (Running) + 45 (Cycling)
  });
});
