import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuestionEditComponent } from './select-question-edit.component';

describe('SelectQuestionEditComponent', () => {
  let component: SelectQuestionEditComponent;
  let fixture: ComponentFixture<SelectQuestionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectQuestionEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
