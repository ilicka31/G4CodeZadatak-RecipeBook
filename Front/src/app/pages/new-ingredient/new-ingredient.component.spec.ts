import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngredientComponent } from './new-ingredient.component';

describe('NewIngredientComponent', () => {
  let component: NewIngredientComponent;
  let fixture: ComponentFixture<NewIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewIngredientComponent]
    });
    fixture = TestBed.createComponent(NewIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
