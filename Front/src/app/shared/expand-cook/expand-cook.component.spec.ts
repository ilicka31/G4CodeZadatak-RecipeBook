import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCookComponent } from './expand-cook.component';

describe('ExpandCookComponent', () => {
  let component: ExpandCookComponent;
  let fixture: ComponentFixture<ExpandCookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandCookComponent]
    });
    fixture = TestBed.createComponent(ExpandCookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
