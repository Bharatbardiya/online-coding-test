import { HttpClient } from '@angular/common/http';
// import { MonacoEditorModule } from 'ngx-monaco-editor';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { Router , ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'

import { RouterModule } from '@angular/router';
import { Inject } from '@angular/core';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-contest-detail',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgFor, NgForOf, NgIf
  ],
  templateUrl: './contest-detail.component.html',
  styleUrl: './contest-detail.component.scss'
})

export class ContestDetailComponent implements OnInit {

  questions: any[] = [
    { title: 'Question 1', difficulty: 'Intermediate', description: '...', content: '...', testCases: ['Test Case 1', 'Test Case 2'], sampleInputs: ['Input 1'], sampleOutputs: ['Output 1'] },
    { title: 'Question 2', difficulty: 'Advanced', description: '...', content: '...', testCases: ['Test Case 1', 'Test Case 2'], sampleInputs: ['Input 1'], sampleOutputs: ['Output 1'] },
    // Add more questions as needed
  ];

  selectedQuestion: any;
  code: string = '';
  public id : any;

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute) { 
      
    }


  private getContestDetails(): void {
    // detail
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id)

    const Token = `Token ${this.getCookie('Token')}`
    // console.log(Token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: Token, 
    });
    this.http
      .get<any>(`http://127.0.0.1:8000/api/contest/${this.id}`, { headers })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    // Initial selection, you can select a default question here
    this.selectedQuestion = this.questions[0];
    this.getContestDetails();
  }

  selectQuestion(question: any): void {
    this.selectedQuestion = question;
  }

  submitCode(): void {
    // Implement code submission logic here
    console.log('Code Submitted:', this.code);
  }





  private getCookie(name: string) {
    console.log("getCookie called")
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
