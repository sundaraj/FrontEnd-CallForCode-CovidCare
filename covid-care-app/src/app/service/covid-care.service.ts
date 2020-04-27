import { Injectable } from '@angular/core';
import { Registration, Login, GeneralNeed, MedicalNeed} from '../shared/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//const host = "http://localhost:8080";
const host = "http://connectneedycovid19.eu-gb.cf.appdomain.cloud";

@Injectable({
  providedIn: 'root'
})
export class CovidCareService {
  public needySubmissionStatus: boolean = false;
  private http: HttpClient;
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.http = _http;
    this.apiUrl = host;
  }

  /* Submit user Registration on POST */
  public postUseRegistration(userReg: Registration): any {
    this.apiUrl = host + '/register';
    return this.http.post(this.apiUrl, userReg, header)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

   /* Check user login credentials */
   public checkUserCredentials(loginData: Login): any {
    this.apiUrl = host + '/login?' + 'phoneNumber=' + loginData.phoneNumber + '&password=' + loginData.password;
    return this.http.get(this.apiUrl)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }


  /* To check whether user medical request sucessful or not*/
  public checkMedicalRequests(): any {
    this.apiUrl = host + '/findAllMedicalRequests';
    return this.http.get(this.apiUrl);
  }

   /* Submit user medical request on POST */
   public postMedicalRequestData(userData: MedicalNeed): any {
    this.apiUrl = host + '/medicalRequestCapture';
    return this.http.post(this.apiUrl, userData, header)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

   /* To check whether user general request sucessful or not*/
   public checkGeneralRequests(): any {
    this.apiUrl = host + '/findAllGeneralRequests';
    return this.http.get(this.apiUrl);
  }

   /* Submit user general request on POST */
   public postGenralRequestData(userData: GeneralNeed): any {
    this.apiUrl = host + '/generalRequestCapture';
    return this.http.post(this.apiUrl, userData, header)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }
}
