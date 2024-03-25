import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultQuestionComponent } from './result-question.component';

describe('ResultQuestionComponent', () => {
  let component: ResultQuestionComponent;
  let fixture: ComponentFixture<ResultQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
