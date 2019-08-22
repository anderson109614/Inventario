import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoproximoComponent } from './mantenimientoproximo.component';

describe('MantenimientoproximoComponent', () => {
  let component: MantenimientoproximoComponent;
  let fixture: ComponentFixture<MantenimientoproximoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoproximoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoproximoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
