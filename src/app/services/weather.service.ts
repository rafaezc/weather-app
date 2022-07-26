import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherModel } from '../models/weather.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weaherCompleteUrl: string = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&exclude=hourly,daily&appid={API key}&units=metric';
  weatherApiKey: string = 'bf5c438f70d77dc96129e5133f74b10e';
  
  gpsCompleteUrl: string = 'http://api.positionstack.com/v1/forward?access_key=YOUR_ACCESS_KEY&query=YOUR_ADDRESS&limit=1&output=json';
  gpsApiKey: string ='c98d843d39b648db955c3864876a5510';
  
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
    let requestVar = this.gpsCompleteUrl.replace('YOUR_ACCESS_KEY', this.gpsApiKey).replace('YOUR_ADDRESS', add);
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
      
    });
    
   
  }

  getWeatherInfo(lat: any, long: any, flag: boolean) {
    
    flag ? this.spinner.show() : '' ;
    
    let requestVar = this.weaherCompleteUrl.replace('{API key}', this.weatherApiKey).replace('{lat}', lat).replace('{lon}', long);
    this.httpClient.get(requestVar).subscribe((response: any) => {

      this.weatherInfo = response;
      this.workAroundWeather = response.weather[0].main;
      this.workAroundMinTemp = response.main.temp_min - 1;
      this.workAroundSpeed = response.wind.speed * 3.6;
      this.workAroundRain = response.rain && response.response.rain["1h"] ? response.rain["1h"] * 100 : 0 ;
      this.spinner.hide();

    },
    (error) => {console.log(error)
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
