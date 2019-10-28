import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts';

@Injectable({providedIn: 'root'}) // only creates one instance, no matter where it is injected
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  createPost(content: string) {
    this.http.post<{any}>(BACKEND_URL, {content}).subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  getPosts() {
    this.http.get<{ posts: any[], postCount: number }>(BACKEND_URL).pipe(map(postData => {
      return {
        posts: postData.posts.map(({_id: id, name, content, creator }) => ({ id, name, content, creator })),
        postCount: postData.postCount
      };
    })).subscribe(mappedPosts => {
      this.posts = mappedPosts.posts;
      this.postsUpdated.next({posts: [...this.posts], postCount: mappedPosts.postCount});
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  follow(followId: string) {
    this.http.put<{ following: string[] }>(environment.apiUrl + '/users/follow', {followerId: localStorage.getItem('userId'), followId})
      .subscribe(response => {
        console.log(response);
      });
  }

  unfollow(followId: string) {
    this.http.put<{ following: string[] }>(environment.apiUrl + '/users/unfollow', {followerId: localStorage.getItem('userId'), followId});
  }
}
