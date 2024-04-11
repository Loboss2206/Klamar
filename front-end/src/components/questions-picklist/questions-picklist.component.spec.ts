import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsPicklistComponent } from './questions-picklist.component';

describe('PickListComponent', () => {
  let component: QuestionsPicklistComponent;
  let fixture: ComponentFixture<QuestionsPicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsPicklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
