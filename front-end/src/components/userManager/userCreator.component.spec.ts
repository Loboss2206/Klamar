import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreatorComponent } from './userCreator.component';

describe('ButtonComponent', () => {
  let component: UserCreatorComponent;
  let fixture: ComponentFixture<UserCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreatorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
