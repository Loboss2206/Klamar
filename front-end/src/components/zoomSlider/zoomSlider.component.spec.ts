import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ZoomSliderComponent} from './zoomSlider.component';

describe('ZoomSliderComponent', () => {
  let component: ZoomSliderComponent;
  let fixture: ComponentFixture<ZoomSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomSliderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ZoomSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
