import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicidadComponent } from './felicidad.component';

describe('FelicidadComponent', () => {
  let component: FelicidadComponent;
  let fixture: ComponentFixture<FelicidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FelicidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FelicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
