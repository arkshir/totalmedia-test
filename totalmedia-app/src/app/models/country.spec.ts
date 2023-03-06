import { Country } from './country';

describe('Country', () => {
  it('should create an instance', () => {
    expect(new Country('Brazil', 'pt-BR', 'BRL', [27.5])).toBeTruthy();
  });
});
