import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dictionary, baseUrl } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  _albumId: number = -1;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  get photos() {
    let url = `${baseUrl}/photos`;
    let photosList = this.http.get(url);
    return photosList;
  }

  set albumId(albumId: number) {
    this._albumId = albumId;
  }

  get album() {
    let url = `${baseUrl}/albums/${this._albumId}`;
    let album = this.http.get(url);
    return album;
  }
}
