import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { Country } from 'src/app/models/country';

import { TaxCalculatorComponent } from './tax-calculator.component';

describe('TaxCalculatorComponent', () => {
  let component: TaxCalculatorComponent;
  let fixture: ComponentFixture<TaxCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxCalculatorComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading component if there is no country in the list', () => {
    const spinner = fixture.nativeElement.querySelector('mat-progress-spinner');

    expect(spinner).toBeTruthy();
  });

  it('should show country selector if loaded', () => {
    component.countries = [new Country('France', 'fr-FR', 'EUR', [5.5, 10])];
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-progress-spinner');

    expect(spinner).toBeFalsy();

    let countrySelector =
      fixture.nativeElement.querySelector('#countrySelector');

    expect(countrySelector).toBeTruthy();
  });

  it('should not show vat selector if no country is selected', () => {
    component.countries = [new Country('France', 'fr-FR', 'EUR', [5.5, 10])];

    fixture.detectChanges();

    let vatSelector = fixture.nativeElement.querySelector(
      '.tax-calculator-radio-group'
    );
    expect(vatSelector).toBeFalsy();
  });

  it('should show vat selector if there is a country selected', () => {
    component.countries = [new Country('France', 'fr-FR', 'EUR', [5.5, 10])];
    component.selectedCountry = component.countries[0];
    component.vats = component.selectedCountry.vats;
    console.log(fixture.nativeElement);
    fixture.detectChanges();
    let vatSelector = fixture.nativeElement.querySelector(
      '.tax-calculator-radio-group'
    );
    expect(vatSelector).toBeTruthy();
  });

  it('should not fields if there is no vat selected', () => {});
});
