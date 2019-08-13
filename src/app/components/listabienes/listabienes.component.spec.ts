import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListabienesComponent } from './listabienes.component';

describe('ListabienesComponent', () => {
  let component: ListabienesComponent;
  let fixture: ComponentFixture<ListabienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListabienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListabienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
