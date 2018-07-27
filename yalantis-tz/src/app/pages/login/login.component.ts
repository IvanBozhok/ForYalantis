import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { RouteUrls } from '../../common/route-urls';
import { UserModel } from './user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedUser = new UserModel;
  constructor(private router: Router,
              private repository: RepositoryService) { }
  ngOnInit() {}
  login(): void {
    this.repository.loginUser(this.loggedUser)
      .subscribe(success => {
        if (success) {
          this.router.navigateByUrl(RouteUrls.ImagesList);
        } else {
          this.router.navigateByUrl(RouteUrls.Default);}
      });
  }
}
