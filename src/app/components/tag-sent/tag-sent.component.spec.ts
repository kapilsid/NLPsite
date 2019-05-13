import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSentComponent } from './tag-sent.component';

describe('TagSentComponent', () => {
  let component: TagSentComponent;
  let fixture: ComponentFixture<TagSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
