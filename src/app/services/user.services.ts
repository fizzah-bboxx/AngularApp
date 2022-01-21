import { map, Observable, of, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary, baseUrl, User } from '../types';
import { FormControl } from '@angular/forms';
import mockData from '../../assets/mockData.json'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _userId: number = -1;

  userdata: Dictionary[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  set userId(id: number) {
    this._userId = id;
  }

  get users() {
    let url = `${baseUrl}/users`;
    let users = this.http.get(url);
    return users;
  }

  get user() {
    let url = `${baseUrl}/users/${this._userId}`;
    let user = this.http.get(url);
    return user;
  }

  editUser(data: User) {
    fetch(`${baseUrl}/users/${this._userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() =>
        confirm(`User with id:${this._userId} is successfully modified`)
      )
      .then(() => {
        this.router.navigate(['/users', this._userId]);
      });
  }

  deleteUser() {
    fetch(`${baseUrl}/users/${this._userId}`, {
      method: 'DELETE',
    }).then(() =>
      confirm(`User at id: ${this._userId} has been successfully deleted`)
    );
  }

  getFilteredOptions(myControl: FormControl): Observable<Dictionary[]> {
    let filteredOptions = myControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );
    return filteredOptions;
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    this.users.subscribe((data) => (this.userdata = data as Dictionary[]));
    return this.userdata.filter((user) =>
      user['name'].toLowerCase().includes(filterValue)
    );
  }
}


export class userServiceStub {
  _userId: number = 1;
  expectedUsers = mockData.users as Dictionary[]

  userdata: Dictionary[] = [];

  set userId(id: number) {
    this._userId = id;
  }

  get users() {
    return of(this.expectedUsers);
  }

  get user() {
    return of(this.expectedUsers[0]);
  }

  editUser(data: User) {
    this.expectedUsers[0] = data
    let updatedUser = this.expectedUsers[0] as User
    console.log(updatedUser)
  }

  deleteUser() {

  }

  getFilteredOptions(myControl: FormControl): Observable<Dictionary[]> {
    return of([{"name":"Ervin Howell"}])
  }
  
}
