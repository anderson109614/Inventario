import { TestBed } from '@angular/core/testing';

import { MantenimientosService } from './mantenimientos.service';

describe('MantenimientosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MantenimientosService = TestBed.get(MantenimientosService);
    expect(service).toBeTruthy();
  });
});
