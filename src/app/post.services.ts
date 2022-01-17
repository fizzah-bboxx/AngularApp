import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dictionary, baseUrl } from './types';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
    _postId:number=-1;
    
    constructor( private route: ActivatedRoute,
                 private http: HttpClient,) {
     }
    set postId(postId:number){
      this._postId = postId;
    }
  
    get comments(){
      let url = baseUrl+"/comments?postId="+this._postId;
      let commnetsList = this.http.get(url)
      return commnetsList
    }
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
    _posts:Dictionary[];
    _userId:number =0;
    url:string;
    
    constructor( private route: ActivatedRoute,
                 private http: HttpClient) {
            this._posts = [];
            this.url = '';
     }

    set userId(userId:number){
      this._userId = userId;
    }
     
    get posts( ){
      this.url =  baseUrl+"/posts?userId="+this._userId;
      return this.http.get(this.url)
    }

    createPost(data:Dictionary, userId:number):{status: 'success' | 'failed'}{
      if (data['title'] && data['body']){
        const jso = fetch(baseUrl+'/posts', {
          method: 'POST',
          body: JSON.stringify({
            title: data['title'],
            body: data['body'],
            userId: this.userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          })
          .then((response) => response.json())
          .then((json) => console.log("Successfully created post :) ",json));
          return {status:'success'};
      }
      console.error("Post was NOT created :(, Invalid data",data)
      return {status:'failed'}
    
    }
}