import { TestBed } from '@angular/core/testing';

import { LaboratoriosService } from './laboratorios.service';

describe('LaboratoriosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaboratoriosService = TestBed.get(LaboratoriosService);
    expect(service).toBeTruthy();
  });
});
