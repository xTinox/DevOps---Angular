import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeryHardComponent } from './very-hard.component';

describe('VeryHardComponent', () => {
  let component: VeryHardComponent;
  let fixture: ComponentFixture<VeryHardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeryHardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeryHardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
