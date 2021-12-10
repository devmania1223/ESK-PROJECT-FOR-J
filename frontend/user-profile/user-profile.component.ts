import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services';
import { Uporabnik } from 'app/_models/uporabnik';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public account: Uporabnik = new Uporabnik();
  constructor(public user: AuthenticationService) {
    this.account = user.getAccount();
   }

  ngOnInit() {
  }

}
