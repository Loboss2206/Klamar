import { ComponentFixture, TestBed } from '@angular/core/testing';

import { quizResultBoxComponent } from './quizResultBox.component';

describe('quizResultBoxComponent', () => {
  let component: quizResultBoxComponent;
  let fixture: ComponentFixture<quizResultBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [quizResultBoxComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(quizResultBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
