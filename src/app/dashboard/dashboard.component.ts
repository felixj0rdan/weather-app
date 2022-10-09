import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import { WeatherData } from './weatherdata.model';
import * as moment from 'moment';
import { SlicePipe } from '@angular/common';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public weatherData: any | undefined;
  public numbers: number[] = [];
  public humidity = 0;
  public cloud = 0;
  public localTime = "";
  public isF = false;
  public precip_in = false;
  public precip_mm = true;
  public isMetric = true;
  public loaded = false;
  public hourlyWeather: any[] = [];
  public left = 0;
  public right = 6;
  public disableRight = false;
  public disableLeft = true;


  // public form: NgForm | undefined ;

  constructor(private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    if( !localStorage.getItem('login') || localStorage.getItem('login') != 'true'){
      this.router.navigate([""]);
    }
    this.humidity = 0;
    this.isMetric = true;
    this.loaded = false;  
    this.left = 0;
    this.right = 6;
    this.disableRight = false;
    this.disableLeft = true; 
    
  }

  onSubmit(form: NgForm) {
      if(form.invalid){
        return;
      }
      // console.log(form.value.location);
      this.weatherData = undefined;
      this.humidity = 0;
      this.cloud = 0;
      this.left = 0;
      this.right = 6;
      this.disableRight = false;
      this.disableLeft = true;

      this.dashboardService
      .getData(form.value.location)
      .subscribe(
        async (data: any) => {

          if(data){
            this.loaded = true;
          } else {
            this.loaded = false;
          }

          this.weatherData = data;
          this.hourlyWeather = data.forecast.forecastday[0].hour;
          console.log(this.hourlyWeather);
          
          let i=1, j=1;

          this.localTime = this.toTime(data.location.localtime.split(' ', 2)[1]);
          while(true){
            if(i<= data?.current.humidity){
              this.humidity = i;
              i++;
            }
            if(j<= data?.current.cloud){
              this.cloud = j;
              j++;
            }
            await this.delay(9);
            if(i> data?.current.humidity && j> data?.current.cloud)
              break;
          }

        }
      )

      // this.dashboardService
      // .getData(form.value.location)
      // .subscribe(
      //   async (data: any) => {

      //     if(data){
      //       this.loaded = true;
      //     } else {
      //       this.loaded = false;
      //     }

      //     this.weatherData = data;
      //     let i=1, j=1;

      //     this.localTime = this.toTime(data.location.localtime.split(' ', 2)[1]);
      //     while(true){
      //       if(i<= data?.current.humidity){
      //         this.humidity = i;
      //         i++;
      //       }
      //       if(j<= data?.current.cloud){
      //         this.cloud = j;
      //         j++;
      //       }
      //       await this.delay(9);
      //       if(i> data?.current.humidity && j> data?.current.cloud)
      //         break;
      //     }

      //   }
      // )     
      
      
  }
  onToggle(val: string){
    if(val == 'mm'){
      this.precip_mm = true;
      this.precip_in = false;
    } else {
      this.precip_mm = false;
      this.precip_in = true;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  toTime(time: string){
    var timeArr = time.split(':', 2);
    var date = new Date().setHours(+timeArr[0], +timeArr[1], 0)
    return moment(date).format("h:mm a");
}

onChangeUnits() {
  this.isMetric = !this.isMetric;
}
moveRight() {
  if(this.disableRight)
    return;
  this.left += 3;
  this.right += 3;
  this.disableLeft = false;
  if(this.right > 23){
    this.disableRight = true;
  }
}
moveLeft() {
  if(this.disableLeft)
    return;
  this.left -= 3;
  this.right -= 3;
  this.disableRight = false;
  if(this.left == 0){
    this.disableLeft = true;
  }
}

}

