import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CovidCareService } from '../service/covid-care.service';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  isError: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  constructor(private router: Router, private _covidService: CovidCareService) { }

  ngOnInit(): void {
    this.isError = false;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  register(form) {
    this._covidService.postUseRegistration(form.value).subscribe((response: any) => {
      if (response.Message) {
        //localStorage.setItem("userInfo", JSON.stringify(response));
        this.router.navigateByUrl('/login');
      }
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });
  }
}
