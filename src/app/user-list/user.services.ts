import { map, Observable, startWith } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dictionary, baseUrl } from '../types';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    _albumId:number=-1;

    userdata:Dictionary[]=[];
    
    constructor( private route: ActivatedRoute,
                 private http: HttpClient,) {
     }
    
    get users(){
        let url =  `${baseUrl}/users`;
        let users = this.http.get(url)
        return users
    }

    getFilteredOptions(myControl:FormControl):Observable<Dictionary[]>{
        let filteredOptions = myControl.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value)),
          );
        console.log()
        return filteredOptions
    }

    private _filter(value:string) {
        const filterValue = value.toLowerCase();
        this.users.subscribe(data=> this.userdata = data as Dictionary[])
        return this.userdata.filter(user => user['name'].toLowerCase().includes(filterValue));
      }
}
