import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserService } from '../../services/user.service';
import { AppState } from '../../models/app.state';
import { Router } from '@angular/router';
import { LoaderDirective } from '../dirctives/loader.directive';
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [LoaderDirective, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users!: any[];
  currentPage: number = 1;
  total_pages: number = 0;
  isLoading: boolean = false;
  displayedColumns: string[] = ['avatar', 'id', 'first_name', 'last_name', 'email'];

  constructor(private userService: UserService, private store: Store<any>
    , private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select('userRed')).subscribe((users: any) => {
      if (users?.users && users?.users.length > 0) {
        this.users = users.users;
        this.total_pages = users.total_pages;
        this.currentPage = users.currentPage;
      } else {
        this.loadUsers(this.currentPage);
      }
    }, error => {
      this.loadUsers(this.currentPage);
    });

  }

  loadUsers(page: number): void {
    this.isLoading = true;
    this.userService.getUsers(page).subscribe(response => {
      this.store.dispatch({ type: 'SET_USERS', payload: response.data, total_pages: response.total_pages, currentPage: page });
      this.total_pages = response.total_pages;
      this.isLoading = false;
    });

  }

  navigateToUserDetails(user: any): void {
    this.store.dispatch({ type: 'SET_SELECTED_USER', payload: user });
    this.router.navigate(['/users', user.id]);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers(page);
  }
}
