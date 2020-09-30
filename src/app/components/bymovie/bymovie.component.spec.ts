import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BymovieComponent } from './bymovie.component';

describe('BymovieComponent', () => {
  let component: BymovieComponent;
  let fixture: ComponentFixture<BymovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BymovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BymovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
