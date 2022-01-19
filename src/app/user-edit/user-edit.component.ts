import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { baseUrl, User } from '../types';
import { UserService } from '../services/user.services';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  name = 'Angular';
  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.editForm = new FormGroup({
      dataItems: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let userIdFromRoute = Number(routeParams.get('userId'));
    this.userService._userId = userIdFromRoute;

    this.userService.user.subscribe((data) =>
      this.editForm.setControl(
        'dataItems',
        this.setExistingDataitems(data as User)
      )
    );
  }

  getControls() {
    return (this.editForm.get('dataItems') as FormArray).controls;
  }

  setExistingDataitems(user: User): FormArray {
    const formArray = new FormArray([]);
    formArray.push(
      this.fb.group({
        id: {value: user.id , disabled: true},
        name: user.name,
        username: user.username,
        email: user.email,
        address: this.fb.group({
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geo: this.fb.group({
            lat: user.address.geo.lat,
            lng: user.address.geo.lng,
          }),
        }),
        phone: user.phone,
        website: user.website,
        company: this.fb.group({
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs,
        }),
      })
    );
    return formArray;
  }

  public saveHandler() {
    const data: User = this.editForm.value['dataItems'][0];
    // send update request to server
    this.userService.editUser(data);
  }
}
