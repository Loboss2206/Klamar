import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMemoyPageComponent } from './stat-memoy-page.component';

describe('StatMemoyPageComponent', () => {
  let component: StatMemoyPageComponent;
  let fixture: ComponentFixture<StatMemoyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatMemoyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatMemoyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
