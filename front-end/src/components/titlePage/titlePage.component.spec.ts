import { ComponentFixture, TestBed } from '@angular/core/testing';

import { titlePageComponent } from './titlePage.component';

describe('titlePageComponent', () => {
  let component: titlePageComponent;
  let fixture: ComponentFixture<titlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [titlePageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(titlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
