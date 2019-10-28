import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService) { }

  ngOnInit() {
  }

  onCreatePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postsService.createPost(form.value.content);
    form.reset();
  }
}
