import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienesactualizarComponent } from './bienesactualizar.component';

describe('BienesactualizarComponent', () => {
  let component: BienesactualizarComponent;
  let fixture: ComponentFixture<BienesactualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienesactualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienesactualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
