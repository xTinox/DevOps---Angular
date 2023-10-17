import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhumanComponent } from './inhuman.component';

describe('InhumanComponent', () => {
  let component: InhumanComponent;
  let fixture: ComponentFixture<InhumanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhumanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InhumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
