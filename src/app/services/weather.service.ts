import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherModel } from '../models/weather.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  completeUrl: string = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&exclude=hourly,daily&appid={API key}&units=metric';
  apiKey: string = 'bf5c438f70d77dc96129e5133f74b10e';
  
  weatherInfo?: WeatherModel;
  workAroundWeather?: string;
  workAroundMinTemp?: number;
  workAroundRain?: any;
  workAroundSpeed?: number;

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) { }

  getWeatherInfo(lat: any, long: any) {
    this.spinner.show();
    let requestVar = this.completeUrl.replace('{API key}', this.apiKey).replace('{lat}', lat).replace('{lon}', long);
    this.httpClient.get(requestVar).subscribe((response: any) => {
      this.weatherInfo = response;
      this.workAroundWeather = response.weather[0].main;
      this.workAroundMinTemp = response.main.temp_min - 1;
      this.workAroundSpeed = response.wind.speed * 3.6;
      this.workAroundRain = response.rain && response.response.rain["1h"] ? response.rain["1h"] * 100 : 0 ;
      console.log(console.log(this.weatherInfo));
      this.spinner.hide();
    },
    (error) => console.log(error));
    this.spinner.hide();

  }

}
