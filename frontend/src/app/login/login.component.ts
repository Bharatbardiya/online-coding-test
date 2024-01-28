// import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // private baseUrl = environment.baseUrl;
  private baseUrl = '127.0.0.1:8000/api/'

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    
    this.isLogin();
    this.initLoginForm();
  }

  private isLogin() : void{
    // detail
    const Token = this.getCookie("Token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${Token}`, // Replace with the actual access token
    });
    this.http
        .get<any>(`http://127.0.0.1:8000/api/api-token-auth`, {headers})
        .subscribe((response)=>{
          console.log(response)
          this.router.navigate(['/contests']);
        },
        (error)=>{
          console.log(error)
        }
      )
  }
  
  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }



  onSubmit(): void {
    console.log('Login form submitted:', this.loginForm.value);
    // Check if the form is valid
    if (this.loginForm.valid) {
      // Prepare the request body
      const requestBody = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      // Make the API request
      this.http
        .post<any>(`http://127.0.0.1:8000/api/auth/login/`, requestBody)
        .subscribe(
          (response) => {
            // Handle the successful response
            console.log('Login success:', response);
            this.setCookie('Token', response.token , 2)
            this.snackBar.open('Login successful!', 'Dismiss', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (error) => {
            // Handle the error response
            console.error('Login error:', error);
            this.snackBar.open(
              'Login failed. Please check your credentials.',
              'Dismiss',
              {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );
          }
        );
    }
  }












  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
  }
}
