import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMemoryComponent } from './result-memory.component';

describe('ResultMemoryComponent', () => {
  let component: ResultMemoryComponent;
  let fixture: ComponentFixture<ResultMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultMemoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
