import { Validators } from '@angular/forms';
import { ITaxCalculationStrategy } from './ITaxCalculationStrategy';

export class PriceWithoutVATStrategy implements ITaxCalculationStrategy {
  public fields = {
    priceWithoutVat: {
      isDisabled: false,
      validators: [Validators.required, Validators.min(0.01)],
    },
    valueAddedTax: {
      isDisabled: true,
      validators: [],
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
    if (!input.priceWithoutVat || input.priceWithoutVat < 0.01 || !vat)
      return input;

    const valueAddedTax = input.priceWithoutVat * vat;
    return {
      priceWithoutVat: input.priceWithoutVat,
      valueAddedTax: valueAddedTax,
      priceInclVat: input.priceWithoutVat + valueAddedTax,
    };
  }
}
