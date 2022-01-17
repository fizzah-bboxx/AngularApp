import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dictionary } from '../types';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent{
  constructor(private http: HttpClient) {}
  users:Dictionary[]= [];
  ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => this.getUsers(json));
  }
  getUsers(data:Dictionary[]){this.users = data}
  

}
