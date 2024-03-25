import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPlayQuestionComponent } from './howToPlayQuestion.component';

describe('HowToPlayQuestionComponent', () => {
  let component: HowToPlayQuestionComponent;
  let fixture: ComponentFixture<HowToPlayQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowToPlayQuestionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HowToPlayQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
