import { Component, OnInit } from '@angular/core';
import { UserToken } from '../_models/userToken';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  currentUser: UserToken;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser$.subscribe(userToken => this.currentUser = userToken);
  }

  ngOnInit() {
  }

}
