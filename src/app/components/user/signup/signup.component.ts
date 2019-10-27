import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit, OnDestroy {
  private userStatusSubscription: Subscription;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userStatusSubscription = this.userService.getUserStatusListener().subscribe(authStatus => { });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userService.createUser(form.value.name, form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.userStatusSubscription.unsubscribe();
  }
}
