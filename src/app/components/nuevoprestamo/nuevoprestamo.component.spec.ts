import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoprestamoComponent } from './nuevoprestamo.component';

describe('NuevoprestamoComponent', () => {
  let component: NuevoprestamoComponent;
  let fixture: ComponentFixture<NuevoprestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoprestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoprestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
