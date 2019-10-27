import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private userListenerSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.userListenerSubscription = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.userListenerSubscription.unsubscribe();
  }
}
