import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor( private countriServices: CountriesService ){}
  ngOnInit(): void {
    this.countries = this.countriServices.cacheStore.byCountries.countries;
    this.initialValue = this.countriServices.cacheStore.byCountries.term;
  }

  searchByCountry( term:string ):void {
    this.countriServices.searchCountry( term )
      .subscribe( countries => {
        this.countries = countries;
      });
  }

}
