import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GalleryService } from '../services/gallery.services';

import { PhotoListComponent } from './photo-list.component';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let httpClient: HttpClient;
  /* let httpTestingController: HttpTestingController; */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{path:'gallery',component: PhotoListComponent}])],
      providers: [GalleryService, ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    /* httpTestingController = TestBed.inject(HttpTestingController); */
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
