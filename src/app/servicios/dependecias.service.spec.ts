import { TestBed } from '@angular/core/testing';

import { DependeciasService } from './dependecias.service';

describe('DependeciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DependeciasService = TestBed.get(DependeciasService);
    expect(service).toBeTruthy();
  });
});
