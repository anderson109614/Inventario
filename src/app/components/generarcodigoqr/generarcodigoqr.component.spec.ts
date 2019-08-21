import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarcodigoqrComponent } from './generarcodigoqr.component';

describe('GenerarcodigoqrComponent', () => {
  let component: GenerarcodigoqrComponent;
  let fixture: ComponentFixture<GenerarcodigoqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarcodigoqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarcodigoqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
