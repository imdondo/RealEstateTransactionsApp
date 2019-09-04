import { TestBed } from '@angular/core/testing';

import { BeneficiariesService } from './beneficiaries.service';

describe('BeneficiariesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeneficiariesService = TestBed.get(BeneficiariesService);
    expect(service).toBeTruthy();
  });
});
