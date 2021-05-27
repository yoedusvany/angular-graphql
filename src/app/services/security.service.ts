import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  url = environment.apiUrl;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  login(username: string, password: string){
    return this.httpClient.post<any>(
      this.url + 'login_check', 
      {
        username,
        password
      }, 
      this.httpHeader
    )
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  logout(){
    this.router.navigate(['login']);
  }

  httpError(error) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
