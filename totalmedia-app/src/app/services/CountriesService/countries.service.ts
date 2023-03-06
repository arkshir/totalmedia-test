import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from 'src/app/models/country';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  private resourceName: string = '/countries';

  private getUrl(): string {
    return `${environment.envVar.apiUrl}${this.resourceName}`;
  }

  getCountries() {
    return this.http.get<Array<Country>>(this.getUrl());
  }
}
