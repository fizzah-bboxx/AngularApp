import { AppComponent } from './app/app.component';
import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '../environments/environment';

import { PhotoListComponent } from 'src/app/photo-list/photo-list.component';
import { PostListComponent } from 'src/app/post-list/post-list.component';
import { UserDetailsComponent } from 'src/app/user-details/user-details.component';
import { UserEditComponent } from 'src/app/user-edit/user-edit.component';
import { UserListComponent } from 'src/app/user-list/user-list.component';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let userId: number = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        UserListComponent,
        UserEditComponent,
        UserDetailsComponent,
        PhotoListComponent,
        PostListComponent,
      ],
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('fakeAsync works', fakeAsync(() => {
    let promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /users', fakeAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/users');
    });
  }));

  it('navigate to "user" with userId redirects you to /users/userId', fakeAsync(() => {
    router.navigate(['users', userId]).then(() => {
      expect(location.path()).toBe(`/users/${userId}`);
    });
  }));

  it('navigate to "edit-user" with userId redirects you to /edit-user/userId', fakeAsync(() => {
    router.navigate(['edit-user', userId]).then(() => {
      expect(location.path()).toBe(`/edit-user/${userId}`);
    });
  }));

  it('navigate to "posts" with userId redirects to /posts?userId=id', fakeAsync(() => {
    router.navigate(['posts'], { queryParams: { userId: userId } }).then(() => {
      expect(location.path()).toBe(`/posts?userId=${userId}`);
    });
  }));

  it('navigate to "gallery" takes you to /gallery', fakeAsync(() => {
    router.navigate(['gallery']).then(() => {
      expect(location.path()).toBe('/gallery');
    });
  }));
});
