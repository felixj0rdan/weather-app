import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

    private userCred = {
        email: "user@gmail.com",
        password: "123456"
    }

    constructor(private router: Router) {}

    ngOnInit(): void {
        if(localStorage.getItem('login') && localStorage.getItem('login') == 'true'){
            this.router.navigate(['dashboard']);
        }
    }
    onLogin(form: NgForm){
        if(form.invalid){
            return;
        }
        
        if(this.userCred.email != form.value.email || this.userCred.password != form.value.password ){
            alert("Invalid email or password!!");
            console.log(form.value);
            return;
        }

        localStorage.setItem('login', "true");

        this.router.navigate(['/dashboard']);
        
    }
    ngOnDestroy(): void {
        
    }
}