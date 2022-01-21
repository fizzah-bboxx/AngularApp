import { PostService, CommentService } from '../services/post.services';
import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../types';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Dictionary[];
  userId?: number;
  imagePath: string;
  isVisible: boolean = false;
  commentPostId: number = -1;
  postForms = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });
  comments: Dictionary[] = [];
  advertisementPath =
    'https://monophy.com/media/mEJl6Dcptu5LWLXE59/monophy.gif';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private postService: PostService
  ) {
    this.posts = [];
    this.imagePath = 'https://picsum.photos/500/300?random=';
  }

  ngOnInit(): void {
    // First get the user id from the current route.
    this.route.queryParams.subscribe((params) => {
      this.userId = Number(params['userId']);
      this.postService._userId = this.userId;
    });

    this.postService.posts.subscribe(
      (data) => (this.posts = data as Dictionary[])
    );
  }

  SubmitPost() {
    let data = this.postForms.value;
    const resp = this.postService.createPost(data, this.userId!);
    if (resp['status'] == 'success') {
      this.posts.push(data);
    }
    this.postForms.reset();
  }

  getComments(postId: number) {
    this.commentService.postId = this.commentPostId = postId;
    this.isVisible = this.isVisible ? false : true;

    this.commentService.comments.subscribe(
      (data) => (this.comments = data as Dictionary[])
    );
    console.log(this.comments);
  }
}
