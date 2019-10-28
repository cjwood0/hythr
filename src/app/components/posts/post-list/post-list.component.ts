import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription  } from 'rxjs';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postsService: PostsService, private userService: UserService) { }

  private postsSub: Subscription;
  private userStatusSubscription: Subscription;
  userIsAuthenticated = false;
  userId: string;
  posts: Post[] = [];
  totalPosts = 0;

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.userStatusSubscription = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.userService.getUserId();
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.userStatusSubscription.unsubscribe();
  }

  follow(followId: string) {
    this.postsService.follow(followId);
  }

  unfollow(followId: string) {
    this.postsService.unfollow(followId);
  }
}
