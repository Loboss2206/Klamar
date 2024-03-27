import { ComponentFixture, TestBed } from '@angular/core/testing';

import { quizResultPageComponent } from './quizResultPage.component';

describe('quizResultPageComponent', () => {
  let component: quizResultPageComponent;
  let fixture: ComponentFixture<quizResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [quizResultPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(quizResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
