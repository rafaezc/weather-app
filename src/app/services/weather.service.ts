import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherModel } from '../models/weather.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  weatherInfo?: WeatherModel;
  workAroundWeather?: string;
  workAroundMinTemp?: number;
  workAroundRain?: any;
  workAroundSpeed?: number;
  
  message?: string;
  classVar?: string;
  alert: boolean = false;

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) { }

  getLatLongValues(add: any) {
    this.spinner.show();
    let requestVar = environment.gpsCompleteUrl.replace('YOUR_ACCESS_KEY', environment.gpsApiKey).replace('YOUR_ADDRESS', add);
    this.httpClient.get(requestVar).subscribe((response: any) => {
      console.log(response);
      if (response.data.length > 0) {
        this.getWeatherInfo(response.data[0].latitude, response.data[0].longitude, false);
      } else {
        this.spinner.hide();
        this.message = 'Type a valid address';
        this.classVar = 'alert alert-warning'
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }

    },
      (error) => { 
        console.log(error)
        this.spinner.hide();
        this.message = error.error.error.context.query.message.charAt(0).toUpperCase() + error.error.error.context.query.message.slice(1).replace('at', 'at least').replace('character\'s', 'characters');
        console.log(this.message);
        this.classVar = 'alert alert-warning'
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
    });
    
   
  }

  getWeatherInfo(lat: any, long: any, flag: boolean) {
    
    flag ? this.spinner.show() : '' ;
    
    let requestVar = environment.weaherCompleteUrl.replace('{APIkey}', environment.weatherApiKey).replace('{lat}', lat).replace('{lon}', long);
    this.httpClient.get(requestVar).subscribe((response: any) => {

      this.weatherInfo = response;
      this.workAroundWeather = response.weather[0].main;
      this.workAroundMinTemp = response.main.temp_min - 1;
      this.workAroundSpeed = response.wind.speed * 3.6;
      this.workAroundRain = response.rain && response.rain["1h"] ? response.rain["1h"] * 100 : 0 ;
      this.spinner.hide();

    },
    (error) => { 

      this.spinner.hide();
      this.message = error.error.message.charAt(0).toUpperCase() + error.error.message.slice(1);
      this.classVar = 'alert alert-danger';
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    });
    
  }

}
