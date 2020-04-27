import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserRequestPageComponent } from './user-request-page/user-request-page.component';
import { MedicalNeedyRequestComponent } from './medical-needy-request/medical-needy-request.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'CovidCare', pathMatch: 'full' }, 
  { path: 'CovidCare', component: HomeComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: AdminDashboardComponent},
  { path: 'generalRequest', component: UserRequestPageComponent}, 
  { path: 'medicalRequest', component: MedicalNeedyRequestComponent },
  { path: '**', redirectTo: 'CovidCare', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }