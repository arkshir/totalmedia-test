import { Validators } from '@angular/forms';
import { ITaxCalculationStrategy } from './ITaxCalculationStrategy';

export class ValueAddedTaxStrategy implements ITaxCalculationStrategy {
  public fields = {
    priceWithoutVat: {
      isDisabled: true,
      validators: [],
    },
    valueAddedTax: {
      isDisabled: false,
      validators: [Validators.required, Validators.min(0.01)],
    },
    priceInclVat: {
      isDisabled: true,
      validators: [],
    },
  };

  calculateValues(
    input: {
      priceWithoutVat?: number | null;
      valueAddedTax?: number | null;
      priceInclVat?: number | null;
    },
    vat: number
  ) {
    if (!input.valueAddedTax || input.valueAddedTax < 0.01 || !vat)
      return input;

    const priceWithoutVat = input.valueAddedTax / vat;
    return {
      priceWithoutVat: priceWithoutVat,
      valueAddedTax: input.valueAddedTax,
      priceInclVat: priceWithoutVat + input.valueAddedTax,
    };
  }
}
