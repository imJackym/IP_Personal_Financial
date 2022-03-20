import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireplanComponent } from './fireplan.component';

describe('FireplanComponent', () => {
  let component: FireplanComponent;
  let fixture: ComponentFixture<FireplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
