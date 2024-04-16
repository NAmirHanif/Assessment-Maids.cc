import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/app.state';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { LoaderDirective } from '../dirctives/loader.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [LoaderDirective, MatCardModule, MatButtonModule ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  user: any;
  isLoading: boolean = false;

  constructor(private store: Store<any>
    , private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.store.pipe(select('userRed')).subscribe(user => {
      this.user = user.selectedUser;
      this.isLoading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
