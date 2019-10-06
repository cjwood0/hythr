import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription  } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postsService: PostsService) { }

  private postsSub: Subscription;

  posts: Post[] = [];
  totalPosts = 0;

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  follow(followId: string) {
    this.postsService.follow(followId);
  }

  unfollow(followId: string) {
    this.postsService.unfollow(followId);
  }
}
