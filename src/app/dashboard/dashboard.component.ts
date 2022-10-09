import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import { WeatherData } from './weatherdata.model';
import * as moment from 'moment';

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

  // public form: NgForm | undefined ;

  constructor(private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    if( !localStorage.getItem('login') || localStorage.getItem('login') != 'true'){
      this.router.navigate([""]);
    }
    this.humidity = 0;
    this.isMetric = true;
    this.loaded = false;  

    this.dashboardService
      .getData("vellore")
      .subscribe(
        async (data: any) => {

          if(data){
            this.loaded = true;
          } else {
            this.loaded = false;
          }

          this.weatherData = data;
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
    
  }

  onSubmit(form: NgForm) {
      if(form.invalid){
        return;
      }
      // console.log(form.value.location);
      this.weatherData = undefined;

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

}

