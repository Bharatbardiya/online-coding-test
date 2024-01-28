import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signin.component';
import { ContestComponent } from './contest/contest.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: 'contests', component: ContestComponent },
  { path: 'contest/:id', component: ContestDetailComponent },
];
