import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  constructor() { }

  posts: Post[] = [ {
    id: 'sdfsd',
    name: 'CJ',
    content: 'This post seems fake',
    creator: 'some id'
  }];

  ngOnInit() {
  }

}
