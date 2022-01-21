import { Component } from '@angular/core';
import { Dictionary } from '../types';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  constructor(
    private userService: UserService,
    private matAutocompleteModule: MatAutocompleteModule
  ) {}
  users: Dictionary[] = [];
  imagePath = 'https://picsum.photos/id/';

  myControl = new FormControl();
  options: string[] = [''];
  filteredOptions!: Observable<Dictionary[]>;

  ngOnInit() {
    this.userService.users.subscribe(
      (data) => this.users = data as Dictionary[]
    );
    this.filteredOptions = this.userService.getFilteredOptions(this.myControl);
  }

  searchHanler() {
    let name = this.myControl.value;
    if (name != '') {
      this.users = this.users.filter((user) => user['name'].includes(name));
    } else {
      this.users = this.userService.userdata;
    }
  }
}
