import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeplanComponent } from './ieplan.component';

describe('IeplanComponent', () => {
  let component: IeplanComponent;
  let fixture: ComponentFixture<IeplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IeplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
