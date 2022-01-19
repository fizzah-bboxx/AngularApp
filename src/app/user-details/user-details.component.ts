import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../types';
import { UserService } from '../services/user.services';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  imagePath: string;
  user: User;
  constructor(private route: ActivatedRoute, private userService: UserService) {
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
          lng: '',
        },
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    };
  }

  ngOnInit(): void {
    // First get the user id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParams.get('userId'));

    this.imagePath = `https://picsum.photos/id/${userIdFromRoute}/200/200`;

    this.userService._userId = userIdFromRoute;
    this.userService.user.subscribe((data) => (this.user = data as User));
  }

  deleteUser() {
    this.userService.deleteUser();
  }
}
