import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';




@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Oceania'];
  public selectedRegion?: Region;
  public initialValue: string = '';

  constructor( private countriService: CountriesService ){}
  ngOnInit(): void {
    this.countries = this.countriService.cacheStore.byRegion.countries;
    this.initialValue = this.countriService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ):void {
    this.selectedRegion = region;
    this.countriService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;
      });
  }

}
