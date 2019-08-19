import { TestBed } from '@angular/core/testing';

import { TecnicosService } from './tecnicos.service';

describe('TecnicosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TecnicosService = TestBed.get(TecnicosService);
    expect(service).toBeTruthy();
  });
});
