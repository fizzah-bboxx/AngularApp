import { map, Observable, startWith } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary, baseUrl, User } from '../types';
import { FormControl } from '@angular/forms';

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
    console.log();
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
