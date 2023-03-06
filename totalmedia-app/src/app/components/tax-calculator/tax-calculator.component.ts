import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from 'src/app/services/CountriesService/countries.service';

import { MatSelectChange } from '@angular/material/select';

import { MatRadioChange } from '@angular/material/radio';

import { Country } from '../../models/country';
import {
  ETaxCalculationStrategy,
  ITaxCalculationStrategy,
  PriceInclVatStrategy,
  PriceWithoutVATStrategy,
  ValueAddedTaxStrategy,
} from './strategies';

@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.scss'],
  providers: [CountriesService],
})
export class TaxCalculatorComponent implements OnInit {
  countries: Array<Country> | null = null;
  selectedCountry: Country | null = null;
  vats: number[] | null = null;
  selectedVat: number | null = null;
  // currencyFormatter: Intl.NumberFormat = new Intl.NumberFormat();

  selectedTaxCalculationStrategy: ETaxCalculationStrategy =
    ETaxCalculationStrategy.PriceWithoutVAT;

  private strategies: Record<ETaxCalculationStrategy, ITaxCalculationStrategy> =
    {
      '1': new PriceWithoutVATStrategy(),
      '2': new ValueAddedTaxStrategy(),
      '3': new PriceInclVatStrategy(),
    };

  priceWithoutVat: string | null = null;
  valueAddedTax: string | null = null;
  priceInclVat: string | null = null;

  formGroup!: FormGroup;

  constructor(
    private countriesService: CountriesService,
    private formBuilder: FormBuilder
  ) {
    const strategy = this.getStrategy();
    this.applyStrategy(strategy);
  }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  getStrategy(): ITaxCalculationStrategy {
    return this.strategies[this.selectedTaxCalculationStrategy];
  }

  applyStrategy(strategy: ITaxCalculationStrategy): void {
    const { priceWithoutVat, valueAddedTax, priceInclVat } = strategy.fields;
    this.formGroup = this.formBuilder.group({
      priceWithoutVat: [
        { value: this.priceWithoutVat, disabled: priceWithoutVat.isDisabled },
        [...priceWithoutVat.validators],
      ],
      valueAddedTax: [
        { value: this.valueAddedTax, disabled: valueAddedTax.isDisabled },
        [...valueAddedTax.validators],
      ],
      priceInclVat: [
        { value: this.priceInclVat, disabled: priceInclVat.isDisabled },
        [...priceInclVat.validators],
      ],
    });
  }

  countryChanged(event: MatSelectChange) {
    const selectedCountry: Country = event.value;
    this.vats = event.value.vats;
    this.selectedVat = null;
    // this.currencyFormatter = new Intl.NumberFormat(selectedCountry.locale, {
    //   style: 'currency',
    //   currency: selectedCountry.currency,
    // });
  }

  selectedVatChanged(event: MatRadioChange) {
    this.selectedVat = event.value;
    this.calculateValues();
  }

  taxCalculationStrategyChanged(event: MatRadioChange) {
    const strategyEnum: ETaxCalculationStrategy = event.value;
    this.selectedTaxCalculationStrategy = strategyEnum;
    this.applyStrategy(this.getStrategy());
  }

  calculateValues() {
    console.log(this.formGroup.hasError('required', ['priceWithoutVat']));
    const newValues = this.getStrategy().calculateValues(
      {
        priceWithoutVat:
          (this.priceWithoutVat && parseFloat(this.priceWithoutVat)) || null,
        valueAddedTax:
          (this.valueAddedTax && parseFloat(this.valueAddedTax)) || null,
        priceInclVat:
          (this.priceInclVat && parseFloat(this.priceInclVat)) || null,
      },
      this.selectedVat! / 100
    );

    if (newValues.priceWithoutVat)
      this.priceWithoutVat = newValues.priceWithoutVat.toFixed(2);

    if (newValues.valueAddedTax)
      this.valueAddedTax = newValues.valueAddedTax.toFixed(2);

    if (newValues.priceInclVat)
      this.priceInclVat = newValues.priceInclVat.toFixed(2);
  }

  inputChanged() {
    this.calculateValues();
  }
}
