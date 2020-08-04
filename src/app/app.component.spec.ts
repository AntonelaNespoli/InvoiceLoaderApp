import {  async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherService } from "./services/weather.service";
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let app: AppComponent;
  let service: WeatherService;
  let httpClient: HttpClient;

  beforeEach(async(()=>{
    service = new WeatherService(httpClient);
    app = new AppComponent(service);
  }));

  //test to getWeekDay(n number)
  it('Test to getWeekDay(n number): The result is MON', async(() => {
    let dayNumber = new Date('2020/08/03').getDay();
    expect(app.getWeekDay(dayNumber+1)).toEqual('MON');
  }));

  it('Test to getWeekDay(n number): The result is THU', async(() => {
    let dayNumber = new Date('2020/11/12').getDay();
    expect(app.getWeekDay(dayNumber+1)).toEqual('THU');
  }));

  //test to getWeatherIcon(i string)
  it('Test to getWeatherIcon(i string): The result is sunny day', async(() => {
    expect(app.getWeatherIcon('01d')).toEqual('../assets/icons/2204345-weather/png/001-sunny.png');
  }));

  it('Test to getWeatherIcon(i string): The result is thunder day', async(() => {
    expect(app.getWeatherIcon('11n')).toEqual('../assets/icons/2204345-weather/png/007-thunder.png');
  }));

});
