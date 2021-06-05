import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RentACar';
  isAuthenticated = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login' || event.url === '/users/add') {
          this.isAuthenticated = false;
        } else {
          this.isAuthenticated = true;
        }
      }
    });
  }
}
