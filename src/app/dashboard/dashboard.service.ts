import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private baseURL = "http://api.weatherapi.com/v1/";
    public apiMethod = "current.json";
    // public location = "";
    private key = "120732b76d6d41a18d5123611220710"

    public weatherData: any;

    constructor(private http: HttpClient, private router: Router) {}

    getData(location: string) {
        // let url = `http://api.weatherapi.com/v1/${this.apiMethod}?key=${this.key}&q=${location}`;
        // console.log(url);
        
        // this.weatherData = this.http.get<any>(url)
        // .pipe(map((data) => {
        //     return data
        // }))
        // return this.weatherData;
        return this.http.get("../../assets/data.json");
    }

}