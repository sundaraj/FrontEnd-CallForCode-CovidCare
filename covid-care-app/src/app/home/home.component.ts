import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { CovidCareService } from '../service/covid-care.service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSubmitted: boolean;
  isPlay: boolean = true;
  @ViewChild("thankCard") thankElement: ElementRef;
  @ViewChild("teaser") videoElement: ElementRef;

  video: string = "https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
  constructor(private _covidService: CovidCareService) { }

  ngOnInit(): void {
    this.isSubmitted = this._covidService.needySubmissionStatus;
    this._covidService.needySubmissionStatus = false;
  //   this.videoElement.nativeElement.muted = true;

  //   if (this._covidService.needySubmissionStatus) {
  //     let element = this.thankElement.nativeElement;
  //     element.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  //   this._covidService.needySubmissionStatus = false;
   }
}
