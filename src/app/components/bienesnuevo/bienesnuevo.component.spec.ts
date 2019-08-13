import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienesnuevoComponent } from './bienesnuevo.component';

describe('BienesnuevoComponent', () => {
  let component: BienesnuevoComponent;
  let fixture: ComponentFixture<BienesnuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienesnuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienesnuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
