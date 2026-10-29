import { Router } from '@angular/router';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  constructor(public router: Router) {}
  protected readonly title = signal('my-app');
}

