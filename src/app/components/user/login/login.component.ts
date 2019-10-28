import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

  private userStatusSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userStatusSubscription = this.userService.getUserStatusListener().subscribe(userStatus => { });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.userStatusSubscription.unsubscribe();
  }
}
