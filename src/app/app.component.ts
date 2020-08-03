import { Component, OnInit } from '@angular/core';
import { WeatherService } from "./services/weather.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'InvoiceLoaderApp';
  existInvoices = JSON.parse(localStorage.getItem('existInvoices')) ?? false;

  total: number = 0;
  longitude: number = 0;
  latitude: number = 0;

  weather: any;
  imgCurrentWeather: string;
  descCurrentWeather: string;
  windSpeed: string;
  temp: number;

  forecast: any;
  iconDay1: string;
  descDay1: string;
  dayWeek1: string;
  iconDay2: string;
  descDay2: string;
  dayWeek2: string;
  iconDay3: string;
  descDay3: string;
  dayWeek3: string;
  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    if (navigator.geolocation) { //check if geolocation is available
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.weatherService.getCurrentWeather(this.latitude, this.longitude)
          .subscribe(
            res => {
              this.weather = res;
              this.windSpeed = ((this.weather.wind.speed * 18) / 5).toFixed(2);
              this.temp = Math.floor(this.weather.main.temp - 273.15);
              //cargar la imagen correcta
              this.imgCurrentWeather = this.getWeatherIcon(this.weather.weather[0].icon);
              this.descCurrentWeather = this.weather.weather[0].description;
            },
            err => console.log(err)
          );
        this.weatherService.getForecastWeather(this.latitude, this.longitude)
          .subscribe(
            res => {
              this.forecast = res;
              //cargar la imagen correcta y el dia para cada dia
              this.iconDay1 = this.getWeatherIcon(this.forecast.list[11].weather[0].icon);
              this.descDay1 = this.forecast.list[11].weather[0].description;
              this.dayWeek1 = this.getWeekDay(new Date(this.forecast.list[11].dt_txt).getDay());

              this.iconDay2 = this.getWeatherIcon(this.forecast.list[19].weather[0].icon);
              this.descDay2 = this.forecast.list[11].weather[0].description;
              this.dayWeek2 = this.getWeekDay(new Date(this.forecast.list[19].dt_txt).getDay());

              this.iconDay3 = this.getWeatherIcon(this.forecast.list[27].weather[0].icon);
              this.descDay3 = this.forecast.list[11].weather[0].description;
              this.dayWeek3 = this.getWeekDay(new Date(this.forecast.list[27].dt_txt).getDay());

            },
            err => console.log(err)
          );
      });
    }
  }
  getWeekDay(day: number): string {
    switch (day) {
      case 1:
        return "SUN";
      case 2:
        return "MON";
      case 3:
        return "TUE";
      case 4:
        return "WEN";
      case 5:
        return "THU";
      case 6:
        return "FRI";
      case 7:
        return "SAT";
    }
  }
  getWeatherIcon(icon: string): string {
    switch (icon) {
      case '01d':
        return "../assets/icons/2204345-weather/png/001-sunny.png";
      case '01n':
        return "../assets/icons/2204345-weather/png/013-new moon.png";
      case '02d': case '03d': case '04d':
        return "../assets/icons/2204345-weather/png/002-cloudy.png";
      case '02n': case '03n': case '04n':
        return "../assets/icons/2204345-weather/png/016-cloudy.png";
      case '09d':
        return "../assets/icons/2204345-weather/png/003-rain.png";
      case '09n':
        return "../assets/icons/2204345-weather/png/017-rain.png";
      case '10d': case '10n':
        return "../assets/icons/2204345-weather/png/005-heavy rain.png";
      case '11d': case '11n':
        return "../assets/icons/2204345-weather/png/007-thunder.png";
      case '13d': case '13n':
        return "../assets/icons/2204345-weather/png/019-snowflake.png";
      case '50d': case '50n':
        return "../assets/icons/2204345-weather/png/011-wind.png";
      default:
        return "../assets/icons/2204345-weather/png/039-rainbow.png"
    }
  }

}
