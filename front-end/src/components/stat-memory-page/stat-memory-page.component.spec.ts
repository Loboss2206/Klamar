import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMemoryPageComponent } from './stat-memory-page.component';

describe('StatMemoyPageComponent', () => {
  let component: StatMemoryPageComponent;
  let fixture: ComponentFixture<StatMemoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatMemoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatMemoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
