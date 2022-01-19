import { GalleryService } from '../services/gallery.services';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dictionary, baseUrl } from '../types';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit {
  photo_list: Dictionary[] = [];
  album: Dictionary = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('userId'));

    this.galleryService.photos.subscribe(
      (data) => (this.photo_list = (data as Dictionary[]).slice(1, 500))
    );
  }

  getAlbum(albumId: number) {
    this.galleryService.albumId = albumId;
    this.galleryService.album.subscribe(
      (data) => (this.album = data as Dictionary)
    );
  }
}
