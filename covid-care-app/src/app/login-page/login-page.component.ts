import { Component, OnInit } from '@angular/core';
import { Login } from '../shared/model';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CovidCareService } from '../service/covid-care.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  auth: Login;
  isError: boolean;
  pocUsers: any[];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private _covidService: CovidCareService) {
    this.auth = new Login();
  }

  ngOnInit(): void {
    this.isError = false;
  }

  login(form) {
    this._covidService.checkUserCredentials(form.value).subscribe((response: any) => {
      if (response.Message === "Inavlid UserName or Password") {
        this.isError = true;
      } else {
        localStorage.setItem("userInfo", JSON.stringify(response.UserName));
        this.router.navigateByUrl('/CovidCare');
      }
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });
  }
}
