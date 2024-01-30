import { HttpClient } from '@angular/common/http';
// import { MonacoEditorModule } from 'ngx-monaco-editor';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Inject } from '@angular/core';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf, NgForOf } from '@angular/common';

import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-contest-detail',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgFor,
    NgForOf,
    NgIf,
  ],
  templateUrl: './contest-detail.component.html',
  styleUrl: './contest-detail.component.scss',
})
export class ContestDetailComponent implements OnInit {
  /*
  id:2
  points:50
  contest:1
  title:"print hello world"
  difficulty_level: "school"
  Description:"print hello world 10 times."
  input_format:"None"
  output_format:"None"
  constraints:"None"
  sample_input:"None"
  sample_output:"hello world"
  memory_limit:"5MB"
  time_limit:"00:00:02"
  solution:"print(\"hello world\")"
  tags:"programming"
  hints:"None"
  creator:"Bharat Bardiya"
  */

  questions: any[] = [];
  // questions: any[] = [
  //   { title: 'Question 1', difficulty: 'Intermediate', description: '...', content: '...', testCases: ['Test Case 1', 'Test Case 2'], sampleInputs: ['Input 1'], sampleOutputs: ['Output 1'] },
  //   { title: 'Question 2', difficulty: 'Advanced', description: '...', content: '...', testCases: ['Test Case 1', 'Test Case 2'], sampleInputs: ['Input 1'], sampleOutputs: ['Output 1'] },
  // ];

  selectedQuestion: any;
  code: string = '';
  input: string = '';
  output: string = '';
  selectedLanguage = '';
  languageMap = { py: 'python', cpp: 'cpp', java: 'java' };
  public id: any;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  private getContestDetails(): void {
    // detail
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    const Token = `Token ${this.getCookie('Token')}`;
    // console.log(Token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: Token,
    });
    this.http
      .get<any>(`http://127.0.0.1:8000/api/contest_question/${this.id}`, {
        headers,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.questions = response;
          this.selectedQuestion = this.questions[0];
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
  runCode(): void {
    console.log("selected language : ", this.selectedLanguage)
    const requestData = {
      apiData: {
        stdin: this.input,
        files: [
          {
            name: `main.${this.selectedLanguage}`,
            content: this.code,
          },
        ],
      },
      language:
        this.selectedLanguage === 'py' ? 'python' : this.selectedLanguage,
    };

    const Token = this.getCookie('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${Token}`,
    });
    this.http
      .post<any>(`http://127.0.0.1:8000/api/run-code/`, requestData, {
        headers,
      })
      .subscribe(
        (response) => {
          console.log(response);
          if (response.error != '') {
            this.output = response.stderr;

          } else {
            this.output = response.stdout;
            console.log(response.stdout);
          }
          console.log("output : ", this.output);
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(requestData);
  }




  private getCookie(name: string) {
    console.log('getCookie called');
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
