import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription  } from 'rxjs';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postsService: PostsService, private userService: UserService, public route: ActivatedRoute) { }

  private postsSub: Subscription;
  private userStatusSubscription: Subscription;
  private followingSubscription: Subscription;
  userIsAuthenticated = false;
  userId: string;
  posts: Post[] = [];
  following: string[] = [];
  totalPosts = 0;
  listType = '';

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('type')) {
        this.listType = paramMap.get('type');
      }
      this.postsService.getPosts(this.listType);
    });

    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.userId = this.userService.getUserId();
    this.userStatusSubscription = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.following = this.userService.getFollowing();
    this.followingSubscription = this.userService.getFollowingListener().subscribe((followingData: {following: string[]}) => {
      this.following = followingData.following;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.followingSubscription.unsubscribe();
    this.userStatusSubscription.unsubscribe();
  }

  isFollowing(creator: string) {
    return this.following.includes(creator);
  }

  follow(followId: string) {
    this.userService.follow(followId);
  }

  unfollow(followId: string) {
    this.userService.unfollow(followId);
  }
}
