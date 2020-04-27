import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent, SafePipe} from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserRequestPageComponent } from './user-request-page/user-request-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ChartsModule } from 'ng2-charts';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MedicalNeedyRequestComponent } from './medical-needy-request/medical-needy-request.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent, SafePipe,
    AdminDashboardComponent,
    UserRequestPageComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    MedicalNeedyRequestComponent,
    BarChartComponent,
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatRadioModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  providers: [HttpClientModule, { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
  bootstrap: [AppComponent]
})
export class AppModule { }
