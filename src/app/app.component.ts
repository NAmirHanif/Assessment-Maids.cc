import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { LoaderDirective } from './dirctives/loader.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent, UserDetailsComponent, HeaderComponent, LoaderDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-user-dashboard';
  constructor(private userService: UserService, private store: Store<any>
    , private router: Router
  ) { }


  searchUser(userId: number): void {
    this.userService.getUserDetails(userId).subscribe(response => {
      if (response) {
        this.store.dispatch({ type: 'SET_SELECTED_USER', payload: response.data });
        this.router.navigate(['/users', response.data.id]);
      } else {
        console.log('No user data received from store.');
      }
    }, error => {
        this.store.dispatch({ type: 'SET_SELECTED_USER', payload: null });
        console.log('Error fetching users from store:', error);
    });
  }
}
