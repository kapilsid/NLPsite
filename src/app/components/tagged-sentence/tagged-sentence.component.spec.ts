import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedSentenceComponent } from './tagged-sentence.component';

describe('TaggedSentenceComponent', () => {
  let component: TaggedSentenceComponent;
  let fixture: ComponentFixture<TaggedSentenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedSentenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
