import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sortComponent } from './sort.component';

describe('sortComponent', () => {
  let component: sortComponent;
  let fixture: ComponentFixture<sortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [sortComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(sortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
