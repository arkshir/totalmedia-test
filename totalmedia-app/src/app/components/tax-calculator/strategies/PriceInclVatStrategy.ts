import { Validators } from '@angular/forms';
import { ITaxCalculationStrategy } from './ITaxCalculationStrategy';

export class PriceInclVatStrategy implements ITaxCalculationStrategy {
  public fields = {
    priceWithoutVat: {
      isDisabled: true,
      validators: [],
    },
    valueAddedTax: {
      isDisabled: true,
      validators: [],
    },
    priceInclVat: {
      isDisabled: false,
      validators: [Validators.required, Validators.min(0.01)],
    },
  };

  calculateValues(
    input: {
      priceWithoutVat?: number | null;
      valueAddedTax?: number | null;
      priceInclVat?: number | null;
    },
    vat: number | null
  ) {
    if (!input.priceInclVat || input.priceInclVat < 0.01 || !vat) {
      return input;
    }

    const priceWithoutTax = input.priceInclVat / (1 + vat);

    return {
      priceWithoutVat: priceWithoutTax,
      valueAddedTax: priceWithoutTax * vat,
      priceInclVat: input.priceInclVat,
    };
  }
}
