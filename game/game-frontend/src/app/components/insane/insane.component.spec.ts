import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsaneComponent } from './insane.component';

describe('InsaneComponent', () => {
  let component: InsaneComponent;
  let fixture: ComponentFixture<InsaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
