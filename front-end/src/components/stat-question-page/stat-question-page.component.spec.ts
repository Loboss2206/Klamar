import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatQuestionPageComponent } from './stat-question-page.component';

describe('StatQuestionPageComponent', () => {
  let component: StatQuestionPageComponent;
  let fixture: ComponentFixture<StatQuestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatQuestionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
