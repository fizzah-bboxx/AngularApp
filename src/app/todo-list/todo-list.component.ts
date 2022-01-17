import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dictionary, baseUrl } from '../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todo_list:Dictionary[] = [];

  constructor(private route: ActivatedRoute,private http: HttpClient) { }
  

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('userId'));
    
    const url =  baseUrl+"/posts?userId="+userId;
    const raw_data = this.http.get(url);
    raw_data.subscribe((data) => this.todo_list = data as Dictionary[])
  }

}
