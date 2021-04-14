import { Injectable } from '@angular/core';
import { Observable,throwError  } from 'rxjs';
import { Login } from '../models/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //url:string="http://localhost:8080/api";
  url:string="http://cs.neonsolutions.xyz:8080/api";
  constructor(private http:HttpClient) { }

  login(loginObject:Login):Observable<any>{
    return this.http.post(this.url+`/auth/v1/login`,loginObject);
  }

  signUp(signUpObj:any){
    return this.http.post(this.url+`/auth/v1/signUp`,signUpObj);
  }
}
