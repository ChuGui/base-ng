import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';
import { UserToken } from '../_models/userToken';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentUser: UserToken;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser$.subscribe(
      userToken => this.currentUser = userToken);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
