import { TestBed } from '@angular/core/testing';

import { CovidCareService } from './covid-care.service';

describe('CovidCareService', () => {
  let service: CovidCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidCareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
