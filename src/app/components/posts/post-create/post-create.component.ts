import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  private userStatusSubscription: Subscription;

  userIsAuthenticated = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.userStatusSubscription = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onCreatePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postsService.createPost(form.value.content);
    form.reset();
  }

  ngOnDestroy() {
    this.userStatusSubscription.unsubscribe();
  }
}
