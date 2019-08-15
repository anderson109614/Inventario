import { TestBed } from '@angular/core/testing';

import { ServiciossuministrosService } from './serviciossuministros.service';

describe('ServiciossuministrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiciossuministrosService = TestBed.get(ServiciossuministrosService);
    expect(service).toBeTruthy();
  });
});
