import { Routes } from '@angular/router';
import { PhotoListComponent } from 'src/app/photo-list/photo-list.component';
import { PostListComponent } from 'src/app/post-list/post-list.component';
import { UserDetailsComponent } from 'src/app/user-details/user-details.component';
import { UserEditComponent } from 'src/app/user-edit/user-edit.component';
import { UserListComponent } from 'src/app/user-list/user-list.component';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:userId', component: UserDetailsComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'edit-user/:userId', component: UserEditComponent },
  { path: 'gallery', component: PhotoListComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }, // when app loads(path is empty) goto users page
];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
