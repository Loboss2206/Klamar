import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStatComponent } from './select-stat.component';

describe('SelectStatComponent', () => {
  let component: SelectStatComponent;
  let fixture: ComponentFixture<SelectStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
