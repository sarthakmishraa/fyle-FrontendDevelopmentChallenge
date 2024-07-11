import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fyle Workout';

  userData = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
  ];

  name = '';
  workoutType = '';
  workoutMinutes: number | null = null;

  workoutTypes = ['Cycling', 'Swimming', 'Yoga', 'Running'];

  addWorkout() {
    if (this.name && this.workoutType && this.workoutMinutes) {
      const newWorkout = {
        id: this.userData.length + 1,
        name: this.name,
        workouts: [
          {
            type: this.workoutType,
            minutes: this.workoutMinutes
          }
        ]
      };
      this.userData.push(newWorkout);
      this.saveToLocalStorage();
      this.resetForm();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  resetLocalStorage() {
    localStorage.clear();
    this.userData = [];
    this.name = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }

  resetForm() {
    this.name = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }

  ngOnInit() {
    const data = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data);
    }
  }
}
