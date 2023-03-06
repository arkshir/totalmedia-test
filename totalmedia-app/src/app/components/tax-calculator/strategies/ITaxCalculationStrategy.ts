import { ValidationErrors } from '@angular/forms';

export enum ETaxCalculationStrategy {
  PriceWithoutVAT = 1,
  ValueAddedTax = 2,
  PriceIncludedVAT = 3,
}

export interface ITaxCalculationStrategy {
  fields: {
    priceWithoutVat: {
      isDisabled: boolean;
      validators: Array<ValidationErrors | null>;
    };
    valueAddedTax: {
      isDisabled: boolean;
      validators: Array<ValidationErrors | null>;
    };
    priceInclVat: {
      isDisabled: boolean;
      validators: Array<ValidationErrors | null>;
    };
  };
  calculateValues(
    input: {
      priceWithoutVat?: number | null;
      valueAddedTax?: number | null;
      priceInclVat?: number | null;
    },
    vat: number | null
  ): {
    priceWithoutVat?: number | null;
    valueAddedTax?: number | null;
    priceInclVat?: number | null;
  };
}
