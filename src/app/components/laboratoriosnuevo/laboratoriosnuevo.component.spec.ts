import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriosnuevoComponent } from './laboratoriosnuevo.component';

describe('LaboratoriosnuevoComponent', () => {
  let component: LaboratoriosnuevoComponent;
  let fixture: ComponentFixture<LaboratoriosnuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoriosnuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoriosnuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
