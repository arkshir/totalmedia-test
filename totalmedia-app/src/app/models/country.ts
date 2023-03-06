export class Country {
  public name: string;
  public vats: number[];
  public locale: string;
  public currency: string;

  constructor(name: string, locale: string, currency: string, vats: number[]) {
    this.name = name;
    this.vats = vats;
    this.locale = locale;
    this.currency = currency;
  }
}
