import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService) { }

  enteredContent: string;
  posts: Post[];
  post: Post;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      content: new FormControl(null, { validators: [Validators.required]})
    });
  }

  onCreatePost() {
    if (this.form.invalid) {
      return;
    }

    this.postsService.createPost(this.form.value.content);
    this.form.reset();
  }
}
