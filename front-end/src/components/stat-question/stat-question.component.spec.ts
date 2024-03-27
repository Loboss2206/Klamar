import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatQuestionComponent } from './stat-question.component';

describe('StatQuestionComponent', () => {
  let component: StatQuestionComponent;
  let fixture: ComponentFixture<StatQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
