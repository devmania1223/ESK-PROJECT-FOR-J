import { Component, Injector } from '@angular/core';
import { AuthenticationService } from 'app/_services';
import { BaseCommonComponent } from '../views/base/base-common.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../app.component.css']
})
export class LoginComponent extends BaseCommonComponent {

  public username: string;
  public password: string;

  constructor(private injector: Injector, private user: AuthenticationService) {
    super(injector)
  }

  login(): void {
    this.user.login(this.username, this.password);
  }
}
