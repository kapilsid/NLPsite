import { TestBed, inject } from '@angular/core/testing';

import { PosServiceService } from './pos-service.service';

describe('PosServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PosServiceService]
    });
  });

  it('should be created', inject([PosServiceService], (service: PosServiceService) => {
    expect(service).toBeTruthy();
  }));
});
