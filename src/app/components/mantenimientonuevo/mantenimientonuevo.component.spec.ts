import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientonuevoComponent } from './mantenimientonuevo.component';

describe('MantenimientonuevoComponent', () => {
  let component: MantenimientonuevoComponent;
  let fixture: ComponentFixture<MantenimientonuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientonuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientonuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
