import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSimonPageComponent } from './stat-simon-page.component';

describe('StatSimonPageComponent', () => {
  let component: StatSimonPageComponent;
  let fixture: ComponentFixture<StatSimonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatSimonPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatSimonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
