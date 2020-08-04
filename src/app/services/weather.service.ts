import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  URIcurrent: string = "";
  URIforecast: string = "";
  apiKey: string;

  constructor(private httpClient: HttpClient) {
    //load the urls for api
    this.apiKey = '699346696374b32fe811c20a030e5717'
    this.URIcurrent = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}`;
    this.URIforecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}`;
  }

  //this services return the current weather
  getCurrentWeather(latitude: number, longitude: number) {
    this.URIcurrent += `&lat=${latitude}&lon=${longitude}`;
    return this.httpClient.get(`${this.URIcurrent}`);

  }
  //this services return the extended forecast
  getForecastWeather(latitude: number, longitude: number) {
    this.URIforecast += `&lat=${latitude}&lon=${longitude}`;
    return this.httpClient.get(`${this.URIforecast}`);

  }
}
