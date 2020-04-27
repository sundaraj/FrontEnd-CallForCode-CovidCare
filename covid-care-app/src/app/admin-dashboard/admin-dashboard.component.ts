import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort, MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectionListChange } from '@angular/material/list';

import { GeneralNeed, MedicalNeed, Role} from '../shared/model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CovidCareService } from '../service/covid-care.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public gridData: any;
  userId: string;
  userRole: string;
  isType: string = 'Medical Need';

  allMedicalRequest: MedicalNeed[] = [];
  allGeneralRequest: GeneralNeed[] = [];

  isLoad: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  errorMessage: string;
  pageEvent: PageEvent;

  displayedColumns: string[] = ['medicalRequestId', 'patientName', 'diagnosed', 'patientNeeds', 'drugName', 'patientPhoneNumber', 'patientCity'];
  displayedColumns1: string[] = ['generalRequestId', 'userName', 'userNeeds', 'isEmergency', 'goodsName', 'phoneNumber'];

  dataSource = new MatTableDataSource();
  sortedDataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  bcLabel1: string;
  bcLabel2: string;

  dcLabels: string[] = [];
  dcData: number[] = [];
  bcLabels: string[] = [];
  bcData: number[] = [];
  bcData1: number[] = [];
  typeOfUsers: { name: string; selected: boolean; }[] = [
    {
      name: 'Medical Need',
      selected: true
    },
    {
      name: 'General Need',
      selected: false
    }
  ];
  panelOpenState = true;

  options: string[] = ['Guest', 'Admin'];

  public diagnosed: any[] = [];
  public userdata1: any[] = [];
  public userdata2: any[] = [];

  constructor(private _covidService: CovidCareService) {
  }

  ngOnInit() {
    this.getAllMedicalNeed();
  }

  getAllMedicalNeed() {
    this.resetValues();
    this._covidService.checkMedicalRequests().subscribe((response: MedicalNeed[]) => {
      if (response) {
        this.allMedicalRequest = response;
          this.medicalChartImplementation();
          this.allMedicalRequest.sort((a, b) => (a.medicalRequestId > b.medicalRequestId) ? -1 : 1);
          this.isSuccess = true;
          this.isLoad = false;
      }
      this.pagination(this.allMedicalRequest);
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });
  }

  getAllGeneralNeed() {
    this.resetValues();
    this._covidService.checkGeneralRequests().subscribe((response: GeneralNeed[]) => {
      if (response) {
        this.allGeneralRequest = response;
          this.generalChartImplementation();
          this.allGeneralRequest.sort((a, b) => (a.generalRequestId > b.generalRequestId) ? -1 : 1);
          this.isSuccess = true;
          this.isLoad = false;
      }
      this.pagination(this.allGeneralRequest);
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });

  }

  medicalChartImplementation() {
    /* Doughnut Chart Value Implementation */
    this.dcLabels = ['Diabetes', 'Cold', 'BP', 'Fever', 'Cough'];

    this.diagnosed = this.allMedicalRequest.filter(item => item.diagnosed !== null).map(val => val.diagnosed);
    this.diagnosed = groupBy(this.diagnosed, function (item) {
      return item;
    });

    for (let i = 0; i < this.diagnosed.length; i++) {
      this.dcData.push(this.diagnosed[i].length);
    }
    this.dcData.sort((one, two) => (one > two ? -1 : 1));

    /* BarChart Value Implementation */

    //this.bcLabels = ['Chennai', 'Pune', 'Coimbatore', 'Singapore', 'United Kingdom'];
    this.bcLabel1 = "Drug Name";
    this.bcLabel2 = "Quantity";

    this.userdata1 = this.allMedicalRequest.filter(item => item.drugName !== '').map(val => val.drugName);
    this.userdata1 = groupBy(this.userdata1, function (item) {
      return item;
    });

    for (let i = 0; i < this.userdata1.length; i++) {
      let label = this.userdata1[i][0];
      this.bcLabels.push(label);
      this.bcData.push(this.userdata1[i].length);
    }

    for (let i = 0; i < this.bcLabels.length; i++) {
      this.userdata2.push(this.allMedicalRequest.filter(item => item.drugName === this.bcLabels[i]).map(val => val.drugQuantity));
    }

    for (let i = 0; i < this.userdata2.length; i++) {
      let count = 0;
      for (let j = 0; j < this.userdata2[i].length; j++) {
        count += this.userdata2[i][j];
      }
      this.bcData1.push(count);
    }
  }

  generalChartImplementation() {
    /* BarChart Value Implementation */

    //this.bcLabels = ['Chennai', 'Pune', 'Coimbatore', 'Singapore', 'United Kingdom'];
    this.bcLabel1 = "Location";
    this.bcLabel2 = "State";

    this.userdata1 = this.allGeneralRequest.filter(item => item.userCity !== '').map(val => val.userCity);
    this.userdata1 = groupBy(this.userdata1, function (item) {
      return item;
    });

    for (let i = 0; i < this.userdata1.length; i++) {
      let label = this.userdata1[i][0];
      this.bcLabels.push(label);
      this.bcData.push(this.userdata1[i].length);
    }

    for (let i = 0; i < this.bcLabels.length; i++) {
      this.userdata2.push(this.allGeneralRequest.filter(item => item.userCity === this.bcLabels[i]).map(val => val.userState.length));
    }

    for (let i = 0; i < this.userdata2.length; i++) {
      let count = 0;
      for (let j = 0; j < this.userdata2[i].length; j++) {
        count += this.userdata2[i][j];
      }
      this.bcData1.push(count);
    }
  }


  pagination(value: any) {
    var pageRecords = value.slice(0, 10);
    this.dataSource = new MatTableDataSource(pageRecords);
    this.gridData = value;
  }

  resetValues() {
    this.message = '';
    this.isLoad = true;
    this.isSuccess = false;
    this.allGeneralRequest = [];
    this.allMedicalRequest = [];
    this.userdata1 = [];
    this.userdata2 = [];
    this.dcLabels = [];
    this.bcLabels = [];
    this.dcData = [];
    this.bcData = [];
    this.bcData1 = [];
  }

  changeState(event: MatSelectionListChange) {
    this.gridData = [];
    this.dataSource = new MatTableDataSource([]);

    this.isType = event.option.value;
    this.typeOfUsers.forEach(item => {
      item.selected = (item.name === this.isType) ? true : false;
    });

    if (this.isType === 'Medical Need') {
      this.getAllMedicalNeed();
    }
    else  {
      this.getAllGeneralNeed();
    }
  }

  nextPage(event: PageEvent) {
    console.log(event.pageSize);
    this.pageEvent = event;

    var start = event.pageIndex * event.pageSize;
    var end = start + event.pageSize;

    var pageRecords = this.gridData.slice(start, end);
    this.dataSource = new MatTableDataSource(pageRecords);

  }

  sortedData = [];

  sortData(event: Sort, type: string) {
    if (!event.active || event.direction === '') {
      this.sortedData = this.gridData;
      return;
    }

    this.sortedData = this.gridData.sort((a, b) => {
      const isAsc = event.direction === 'asc';

      if (type === 'Medical Need') {
        switch (event.active) {
          case 'medicalRequestId': return compare(a.medicalRequestId, b.medicalRequestId, isAsc);
          case 'patientName': return compare(a.patientName, b.patientName, isAsc);
          case 'diagnosed': return compare(a.diagnosed, b.diagnosed, isAsc);
          case 'patientNeeds': return compare(a.patientNeeds, b.patientNeeds, isAsc);
          case 'drugName': return compare(a.drugName, b.drugName, isAsc);
          case 'patientPhoneNumber': return compare(a.patientPhoneNumber, b.patientPhoneNumber, isAsc);
          case 'patientCity': return compare(a.patientCity, b.patientCity, isAsc);
          default: return 0;
        }
      }
      else {
        switch (event.active) {
          case 'generalRequestId': return compare(a.generalRequestId, b.generalRequestId, isAsc);
          case 'userName': return compare(a.userName, b.userName, isAsc);
          case 'userNeeds': return compare(a.userNeeds, b.userNeeds, isAsc);
          case 'isEmergency': return compare(a.isEmergency, b.isEmergency, isAsc);
          case 'goodsName': return compare(a.goodsName, b.goodsName, isAsc);
          case 'phoneNumber': return compare(a.phoneNumber, b.phoneNumber, isAsc);
          default: return 0;
        }
      }
    });

    if (this.pageEvent) {
      this.nextPage(this.pageEvent);
    }
    else {
      this.pageEvent = new PageEvent();
      this.pageEvent.pageIndex = 0;
      this.pageEvent.pageSize = 10;

      this.nextPage(this.pageEvent);

    }
  }

  setRole(role: string) {
    this.errorMessage = '';
    this.isError = false;
    if ((this.userId !== undefined && this.userId !== '') && role !== '') {
      let user = new Role();
      user.phoneNumber= this.userId;
      user.Role = role;
      this.isSuccess = true;
      this.message = 'The User Role has been assigned successfully!';
      this.userId = '';
      this.userRole = '';
      // this._covidService.postUserRole(user).subscribe((response: Role) => {
      //   if (response === null) {
      //     this.userId = "";
      //     this.isSuccess = true;
      //     this.message = 'The User Role has been assigned successfully!';
      //     console.log(this.isSuccess);
      //   }
      // },
      //   (error: HttpErrorResponse) => {
      //     this.isError = true;
      //     this.errorMessage = "oops! Could you please try again after some time!"
      //   });

    } else {
      this.isError = true;
      this.errorMessage = "Ahh! You missed something.";
    }
  }

  rest(value: string) {
    this.errorMessage = (value === undefined || value === '') ? '' : this.errorMessage;
  }

  // openDialog(): void {
  //   let modalData = new DialogData();
  //   modalData.name = this.userInfo.Role;
  //   modalData.message = "Please note that, import document should be only in the below format!"

  //   const dialogRef = this._dialog.open(ModalComponent, {
  //     data: modalData
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.postExcelReport(result);
  //   });
  // }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function groupBy(array, f) {
  var groups = {};
  array.forEach(function (o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  })
}