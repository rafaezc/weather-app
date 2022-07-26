import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { WeatherModel } from '../models/weather.model';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {

  searchAddress;

  public lat = 0;
  public long = 0;

  weatherInfo?: WeatherModel;

  constructor(public weather: WeatherService, private formBuilder: FormBuilder) { 
    this.searchAddress = this.formBuilder.group({
      address: ['', [Validators.required]]
    });
  
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          
          this.weather.getWeatherInfo(this.lat, this.long, true);
          
        }
      },
        (error) => console.log(error));
    } else {
      // set an alert or use some lib to display error messages
      alert("Geolocation is not supported by this browser.");
    }
  
  }

  search() {
    let typedAddress = this.searchAddress.get('address')?.value;
    this.weather.getLatLongValues(typedAddress);
    
  }
  
  ngOnInit(): void {
    this.getLocation();
    this.searchAddress.get('address')?.setValue('Rolandia, BR');
    
  }

}
