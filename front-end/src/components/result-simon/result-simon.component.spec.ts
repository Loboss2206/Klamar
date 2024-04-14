import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSimonComponent } from './result-simon.component';

describe('ResultSimonComponent', () => {
  let component: ResultSimonComponent;
  let fixture: ComponentFixture<ResultSimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultSimonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultSimonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
