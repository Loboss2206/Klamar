import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserStatComponent } from './select-user-stat.component';

describe('SelectUserStatComponent', () => {
  let component: SelectUserStatComponent;
  let fixture: ComponentFixture<SelectUserStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectUserStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectUserStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
