import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService, userServiceStub } from '../services/user.services';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        HttpClientTestingModule,
        MatAutocompleteModule,
        RouterTestingModule.withRoutes([
          { path: 'users', component: UserListComponent },
        ]),
      ],
      //providers: [ UserService ],  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: UserService, useClass: userServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    let h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual('Users');
  });

  it('should have "user_list" populated ', () => {
    expect(component.users.length).toBeGreaterThan(0);
  });

  it('should render users list', () => {
    const usersElement =
      fixture.debugElement.nativeElement.querySelector('.users-list');
    expect(usersElement).not.toBeNull();
  });

  it('should check users data', () => {
    const userName = fixture.debugElement.query(By.css('a'));
    expect(userName.nativeElement.innerHTML).toContain(
      component.users[0]['name']
    );
    const userEmail =
      fixture.debugElement.nativeElement.querySelector('#email');
    expect(userEmail.innerHTML).toContain(component.users[0]['email']);
    const userPhone =
      fixture.debugElement.nativeElement.querySelector('#phone');
    expect(userPhone.innerHTML).toContain(component.users[0]['phone']);
  });

  it('should call search Handler', () => {
    spyOn(component, 'searchHanler').and.callThrough();
    component.searchHanler();
    component.filteredOptions.subscribe((data) =>
      expect(data[0]['name']).toEqual('Ervin Howell')
    );
  });

  it('should auto complete search ', async () => {
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = 'Ervin';
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matOptions = document.querySelectorAll('mat-option');
    expect(matOptions.length).toBe(1);
    const optionToClick = matOptions[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();
    expect(inputElement.nativeElement.value).toContain('Ervin Howell');
  });
});
