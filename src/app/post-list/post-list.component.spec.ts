import { PostService, PostServiceStub } from './../services/post.services';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { FormBuilder } from '@angular/forms';

const testPost = {
  title: 'Testing Forms',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia',
};

describe('PostListComponent', () => {
  let httpClient: HttpClient;
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'posts', component: PostListComponent },
        ]),
      ],
      providers: [
        { provide: PostService, useClass: PostServiceStub },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "post_list" populated ', () => {
    expect(component.posts.length).toBeGreaterThan(0);
  });

  it('post form invalid when empty', () => {
    expect(component.postForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    let title = component.postForm.controls['title'];
    expect(title.valid).toBeFalsy();
  });

  it('title field validity failiure throws error', () => {
    let errors;
    let body = component.postForm.controls['body'];
    errors = body.errors;
    expect(errors!['required']).toBeTruthy();
  });

  it('should check post form controller', fakeAsync(() => {
    component.postForm.controls['title'].setValue(testPost.title);
    component.postForm.controls['body'].setValue(testPost.body);

    expect(component.postForm.value).toEqual(testPost);
  }));

  it('should create a post', () => {
    component.postForm.controls['title'].setValue(testPost.title);
    component.postForm.controls['body'].setValue(testPost.body);
    expect(component.postForm.valid).toBeTruthy();

    spyOn(component, 'SubmitPost').and.callThrough();

    component.SubmitPost();
    let createdPost = component.posts[component.posts.length - 1];
    expect(createdPost['title']).toBe(testPost.title);
    expect(createdPost['body']).toBe(testPost.body);
  });
});
