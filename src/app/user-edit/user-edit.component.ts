import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { baseUrl, User } from "../types";
@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit{
  name = "Angular";
  editForm: FormGroup;
  user: User;
  userIdFromRoute:number = 0;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.user = {
        id:-1,
        name: '',
        username: '',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: ''
          }
        },
        phone: '',
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: ''
        }
      };
      this.editForm = new FormGroup({
        dataItems: this.fb.array([])
      });
    
  }

  ngOnInit(): void{
    const routeParams = this.route.snapshot.paramMap;
    this.userIdFromRoute = Number(routeParams.get('userId'));

    fetch('https://jsonplaceholder.typicode.com/users/'+this.userIdFromRoute)
    .then(response => response.json())
    .then(json => this.user = json)
    .then( ()=>{
      this.editForm.setControl( "dataItems", this.setExistingDataitems(this.user) );
    });   
  }

  getControls() {
    return (this.editForm.get('dataItems') as FormArray).controls;
  }

  setExistingDataitems(user: User): FormArray {
    const formArray = new FormArray([])
    formArray.push(this.fb.group({
      id: user.id,
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
        })
      }),
      phone: user.phone,
      website: user.website,
      company: this.fb.group({
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs
      })
    }));
    return formArray;
  }

  public saveHandler() {
    const updatedUser:User = this.editForm.value['dataItems'][0];
    // send update request to server 
    fetch(`${baseUrl}/users/${this.userIdFromRoute}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(()=>{this.router.navigate(['/users', this.userIdFromRoute])});
  }
}
