import { Dictionary, User } from './../types';
import { UserService } from './user.services';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import mockData from '../../assets/mockData.json';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let routerSpy: jasmine.SpyObj<Router>;
let activeRouteSpy: jasmine.SpyObj<ActivatedRoute>;
let userService: UserService;
const expectedUsers = mockData.users as Dictionary[];

beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  userService = new UserService(activeRouteSpy, httpClientSpy, routerSpy);
});

it('should get users list', fakeAsync((done: DoneFn) => {
  httpClientSpy.get.and.returnValue(of(expectedUsers));

  userService.users.subscribe((users) => {
    expect(users).toEqual(expectedUsers);
  });
}));

it('should get user with specific id', () => {
  let id:number = 1;
  userService._userId = id;

  httpClientSpy.get.and.returnValue(of(expectedUsers[0]));

  userService.user.subscribe((user) => {
    let _user: User = user as User;
    expect(_user).toBeTruthy();
    expect(_user['id']).toBe(id);
  });
});
