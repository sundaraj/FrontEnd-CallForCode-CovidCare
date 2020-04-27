import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CovidCareService } from '../service/covid-care.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-request-page',
  templateUrl: './user-request-page.component.html',
  styleUrls: ['./user-request-page.component.css']
})
export class UserRequestPageComponent implements OnInit {
  isError: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  
  constructor(private router: Router,private _covidService: CovidCareService) { }

  ngOnInit(): void {
    this.isError = false;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  generalNeedy(form) {
    this._covidService.postGenralRequestData(form.value).subscribe((response: any) => {
      if (response) {
        this._covidService.needySubmissionStatus = true;
        this.router.navigateByUrl('/CovidCare');
      }
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });
  }

}
