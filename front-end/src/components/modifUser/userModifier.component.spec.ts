import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModifierComponent } from './userModifier.component';


describe('ButtonComponent', () => {
  let component: UserModifierComponent;
  let fixture: ComponentFixture<UserModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserModifierComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
