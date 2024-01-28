import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-contest',
  standalone: true,
  imports: [MatButtonModule, RouterLinkActive, RouterOutlet, MatCardModule, RouterModule, NgIf, NgFor],
  templateUrl: './contest.component.html',
  styleUrl: './contest.component.scss',
})
export class ContestComponent implements OnInit{

  constructor(private http: HttpClient) {}
  contests : any = [
    {
      id: 1,
      name: 'Coding Contest 1',
      duration: '2 hours',
      description:"",
      allowed_languages:"",
      instructions:"",
      difficulty_level:"",
    },
    {
      id: 2,
      name: 'Coding Contest 2',
      duration: '1.5 hours',
      description:"",
      allowed_languages:"",
      instructions:"",
      difficulty_level:"",
    },
    // Add more contests as needed
  ];
  
  private getAllContests(): void {
    const Token = `Token ${this.getCookie('Token')}`
    // console.log(Token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: Token, 
    });

    this.http
      .get<any>(`http://127.0.0.1:8000/api/contest/`, { headers })
      .subscribe(
        (response) => {
          console.log(response);
          this.contests = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  ngOnInit(): void {
      this.getAllContests()
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
