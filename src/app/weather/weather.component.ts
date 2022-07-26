import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { WeatherModel } from '../models/weather.model';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(public weather: WeatherService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { 
    this.searchAddress = this.formBuilder.group({
      address: ['', [Validators.required]]
    });
  
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log(position);
          
          console.log("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          console.log(this.lat);
          console.log(this.long);
          this.spinner.show();
          this.weather.getWeatherInfo(this.lat, this.long);
          this.spinner.hide();
          
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  
  }
  
  ngOnInit(): void {
    

    // this.weather.getWeatherInfo(-41.1335, -71.3103);

    // this.weather.getWeatherInfo(19.4326, -99.1332);

    this.getLocation();
    this.searchAddress.get('address')?.setValue('Rolandia, BR');
  }

}
