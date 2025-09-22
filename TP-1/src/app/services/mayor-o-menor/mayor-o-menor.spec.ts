import { TestBed } from '@angular/core/testing';

import { MayorOMenor } from './mayor-o-menor';

describe('MayorOMenor', () => {
  let service: MayorOMenor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MayorOMenor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
