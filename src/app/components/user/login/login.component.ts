import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.login(form.value.email, form.value.password);
  }
}
