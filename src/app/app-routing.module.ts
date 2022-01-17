import { UserEditComponent } from './user-edit/user-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:userId', component: UserDetailsComponent },
  { path: 'posts/:userId', component: PostListComponent },
  { path: 'edit-user/:userId', component: UserEditComponent },
  { path: 'todos/:userId', component: TodoListComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' } // when app loads(path is empty) goto users page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
