import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesPicklistComponent } from './images-picklist.component';

describe('PickListComponent', () => {
  let component: ImagesPicklistComponent;
  let fixture: ComponentFixture<ImagesPicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesPicklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
