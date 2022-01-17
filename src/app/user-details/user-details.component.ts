import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../types'


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  imagePath:string;
  user:User;
  constructor(private route: ActivatedRoute) {
    this.imagePath = '';
     this.user = {
      id: -1,
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
    }
   }
  
  ngOnInit(): void {
    // First get the user id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParams.get('userId'));

    this.imagePath = "https://picsum.photos/id/"+userIdFromRoute+"/200/200"

    fetch('https://jsonplaceholder.typicode.com/users/'+userIdFromRoute)
    .then(response => response.json())
    .then(json => this.getUser(json));

  }

  getUser(user :User):void{this.user = user}

}
