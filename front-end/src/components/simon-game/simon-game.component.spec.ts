import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimonGameComponent } from './simon-game.component';

describe('SimonGameComponent', () => {
  let component: SimonGameComponent;
  let fixture: ComponentFixture<SimonGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimonGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
