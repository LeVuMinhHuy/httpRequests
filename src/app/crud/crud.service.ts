import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "https://reqres.in/api/users";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  }

  constructor(private httpClient: HttpClient) { }
  
  // create(user): Observable<User> {
  //   return this.httpClient.post<User>(this.apiServer, )
  // }

  getById(id): Observable<User> {
    return this.httpClient.get<User>(this.apiServer + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // update

  // delete

  errorHandler(error){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code : ${error.status}\nMessage : ${error.message}';
    }
    console.log(errorMessage);
    
    return throwError(errorMessage);
  }
  
}
