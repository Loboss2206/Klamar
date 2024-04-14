import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuestionCreateComponent } from './select-question-create.component';

describe('SelectQuestionCreateComponent', () => {
  let component: SelectQuestionCreateComponent;
  let fixture: ComponentFixture<SelectQuestionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectQuestionCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
