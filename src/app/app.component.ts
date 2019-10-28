import { Component, OnInit } from '@angular/core';
import { UserService } from './components/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'hythr';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.autoAuthUser();
  }
}
