import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CovidCareService } from '../service/covid-care.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-needy-request',
  templateUrl: './medical-needy-request.component.html',
  styleUrls: ['./medical-needy-request.component.css']
})
export class MedicalNeedyRequestComponent implements OnInit {
  isError: boolean;

  constructor(private router: Router, private _covidService: CovidCareService) { }

  ngOnInit(): void {
    this.isError = false;
  }

  medicalNeedy(form) {
    this._covidService.postMedicalRequestData(form.value).subscribe((response: any) => {
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
